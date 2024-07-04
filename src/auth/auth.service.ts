import { HttpException, Injectable } from '@nestjs/common';
import { User } from 'src/user/user.interface';
import * as jsonwebtoken from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';
import { UserService } from 'src/user/user.service';
import { MailService } from 'src/common/mail/mail.service';
import { promises as fs } from 'fs';
import * as path from 'path';
import { JwtPayload } from 'jsonwebtoken';
import { UserMapper } from 'src/user/user.mapper';
@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly mailService: MailService,
  ) {}
  private readonly saltRounds = 10;
  private cachedFile = {};
  private readonly mailTemplatePath = '../../html/register.template.html';
  private readonly jwtExpiresIn = '1h';
  async registerUser(user: User) {
    user.status = 'UNVERIFIED';
    user.password = await this.hashPassword(user.password);
    //TODO email unique check
    const filePath = path.join(__dirname, this.mailTemplatePath);

    await Promise.all([
      this.userService.createUser(user),
      this.readFileToCache(filePath),
    ]);
    let jwt = this.generateJwtByUserId(user.id);
    this.mailService.sendMailHtml(
      user.email,
      '驗證您的電子信箱',
      this.cachedFile[filePath].replace('{{token}}', jwt),
    );
  }

  async verifyUser(jwt: string) {
    let userId: string | JwtPayload;
    try {
      userId = jsonwebtoken.verify(jwt, process.env.JWT_SECRECT);
    } catch (e) {
      throw new HttpException('token過期，請重新登入系統並重寄驗證信', 401);
    }
    //TODO 檢查是否已驗證過。已驗證和未驗證要顯示不同的東西
    let id = UserMapper.user(userId).id;
    let user = await this.userService.findById(id);
    if (!user || !user.status)
      throw new HttpException('資料有誤，請聯繫系統管理員', 500);
    if (user.status == 'UNVERIFIED') {
      await this.userService.updateStautsByUserId(user.id, 'VERIFIED');
      return '驗證成功，請重新登入';
    } else {
      return '帳號已驗證';
    }
  }

  private async hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, this.saltRounds);
  }

  generateJwtByUserId(userId: string): string {
    let jwt = jsonwebtoken.sign(UserMapper.user
      ({ id: userId }), process.env.JWT_SECRECT, {
      expiresIn: this.jwtExpiresIn,
    });
    return jwt;
  }

  private async readFileToCache(path: string) {
    if (!this.cachedFile[path]) {
      this.cachedFile[path] = await fs.readFile(path, 'utf8');
    }
  }
}
