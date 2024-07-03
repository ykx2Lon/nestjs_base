import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { CustomDecoratorModule } from './common/decorators/custom-decorator.module';

@Module({
  imports: [AuthModule,CustomDecoratorModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
