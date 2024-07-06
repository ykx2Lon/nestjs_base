import { Module } from '@nestjs/common';

import { UserModule } from 'src/user/user.module';
import {
  IsUserIdUniqueConstraint,
} from './register-validation.decorator';

@Module({
  imports: [UserModule],
  providers: [IsUserIdUniqueConstraint],
  exports: [IsUserIdUniqueConstraint],
})
export class CustomDecoratorModule {}
