import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';
import { Gender } from 'src/utils/common.util';

/**
 * Defines the create client payload
 */
export class CreateClientDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  lastName: string;

  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsNumber()
  @Min(1)
  age: number;

  @ApiProperty()
  @IsEnum(Gender)
  gender: Gender;

  @ApiProperty({ type: [Number] })
  @IsArray()
  @IsOptional()
  programIds: Array<number>;
}

/**
 * Defines the update client payload
 */
export class UpdateClientDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  firstName: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  lastName: string;

  @ApiProperty()
  @IsEmail()
  @IsOptional()
  email: string;

  @ApiProperty()
  @IsNumber()
  @Min(1)
  @IsOptional()
  age: number;

  @ApiProperty()
  @IsEnum(Gender)
  @IsOptional()
  gender: Gender;
}
