import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';
import { UserRole } from 'src/utils/common.util';

/**
 * Defines the create user payload
 */
export class CreateUserDto {
  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsString()
  @MinLength(8)
  password: string;
}

/**
 * Defines the update user payload
 */
export class UpdateUserDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  fullName: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  photoUrl: string;

  @ApiProperty()
  @IsEnum(UserRole)
  @IsOptional()
  role: UserRole;
}

export class UpdateUserLoggedInDto {
  @ApiProperty()
  @IsBoolean()
  isLoggedIn: boolean;
}
