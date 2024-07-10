import { applyDecorators } from '@nestjs/common';
import {
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  MinLength,
  ValidationOptions,
} from 'class-validator';
import { Regex } from '../regex/regex';
// 基本資料DTO常用驗證
export function IsUserId(validationOptions?: ValidationOptions) {
  return applyDecorators(
    Matches(Regex.USER_ID, validationOptions),
  );
}

export function IsUserName(validationOptions?: ValidationOptions) {
  return applyDecorators(
    Matches(Regex.USER_NAME, validationOptions),
  );
}

export function IsUserUnhashPassword(validationOptions?: ValidationOptions) {
  return applyDecorators(
    Matches(Regex.USER_PASSWORD, validationOptions),
  );
}

