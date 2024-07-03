import { applyDecorators } from '@nestjs/common';
import {
  IsString,
  MinLength,
  MaxLength,
  ValidationOptions,
  IsNotEmpty,
} from 'class-validator';
// 基本資料DTO常用驗證
export function IsUserId(validationOptions?: ValidationOptions) {
  return applyDecorators(
    IsString(validationOptions),
    MinLength(4, validationOptions),
    MaxLength(12, validationOptions),
    IsNotEmpty(validationOptions),
  );
}

export function IsUserName(validationOptions?: ValidationOptions) {
  return applyDecorators(
    IsString(validationOptions),
    MinLength(1, validationOptions),
    MaxLength(20, validationOptions),
    IsNotEmpty(validationOptions),
  );
}

export function IsUserUnhashPassword(validationOptions?: ValidationOptions) {
  return applyDecorators(
    IsString(validationOptions),
    MinLength(4, validationOptions),
    MaxLength(12, validationOptions),
    IsNotEmpty(validationOptions),
  );
}

