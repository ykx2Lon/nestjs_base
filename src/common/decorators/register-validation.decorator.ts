import { Injectable } from "@nestjs/common";
import { ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments, ValidationOptions, registerDecorator } from "class-validator";
import { UserService } from "src/user/user.service";

@ValidatorConstraint({ async: true })
@Injectable()
export class IsUserIdUniqueConstraint implements ValidatorConstraintInterface {
  constructor(private readonly userService: UserService) {}
  async validate(userId: any, args: ValidationArguments) {
    const user = await this.userService.findById(userId);
    if (user) return false;
    return true;
  }
}

export function IsUserIdUnique(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsUserIdUniqueConstraint,
    });
  };
}
