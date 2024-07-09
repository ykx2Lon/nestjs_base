import { HttpException, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { promises as fs } from 'fs';
import * as jsonwebtoken from 'jsonwebtoken';
import { JwtPayload } from 'jsonwebtoken';
import * as path from 'path';
import { MailService } from 'src/common/mail/mail.service';
import { User } from 'src/user/user.interface';
import { UserMapper } from 'src/user/user.mapper';
import { UserService } from 'src/user/user.service';
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
  async registerUser(user: User):Promise<string> {
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
    return '建立成功，請去信箱進行帳號驗證';
  }

  async verifyUser(jwt: string):Promise<string> {
    let userId: string | JwtPayload;
    try {
      userId = jsonwebtoken.verify(jwt, process.env.JWT_SECRECT);
    } catch (e) {
      throw new HttpException('token過期，請重新登入系統並重寄驗證信', 401);
    }
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

  async loginCheck(userId: string, pwd: string):Promise<Omit<User, 'password'>> {
    let user: User = await this.userService.findById(userId);
    if (!user) throw new HttpException('使用者不存在', 401);
    let result = await bcrypt.compare(pwd, user.password);
    if (!result) throw new HttpException('密碼錯誤', 401);
    const { password, ...userData } = user;
    return userData;
  }

  private async hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, this.saltRounds);
  }

  private generateJwtByUserId(userId: string): string {
    let jwt = jsonwebtoken.sign(
      UserMapper.user({ id: userId }),
      process.env.JWT_SECRECT,
      {
        expiresIn: this.jwtExpiresIn,
      },
    );
    return jwt;
  }

  private async readFileToCache(path: string) {
    if (!this.cachedFile[path]) {
      this.cachedFile[path] = await fs.readFile(path, 'utf8');
    }
  }
}
