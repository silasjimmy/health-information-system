import {
  CreateUserDto,
  UpdateUserDto,
  UpdateUserLoggedInDto,
} from 'src/resources/user/dto/user.dto';

/**
 * Defines the sign up payload, inheriting properties from the create user dto
 */
export class SignUpDto extends CreateUserDto {}

/**
 * Defines the sign in payload, inheriting properties from the sign up dto
 */
export class SignInDto extends SignUpDto {}

/**
 * Defines the update user profile payload, inheriting from the update user dto
 */
export class UpdateProfileDto extends UpdateUserDto {}

/**
 * Defines the update logged in payload, inheriting from the update user logged in dto
 */
export class UpdateLoggedInDto extends UpdateUserLoggedInDto {}
