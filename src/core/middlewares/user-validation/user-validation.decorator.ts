import { applyDecorators, SetMetadata } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';

export const UserValidationAuthName = 'User Validation';
export const IS_USER_VALIDATED_PATH = 'isUserValidatedPath';

export function Auth() {
  return applyDecorators(
    SetMetadata(IS_USER_VALIDATED_PATH, true),
    ApiBearerAuth(UserValidationAuthName),
  );
}