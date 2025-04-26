import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

/**
 * Defines the create program payload
 */
export class CreateProgramDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  label: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  value: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  description: string;
}

/**
 * Defines the update program payload
 */
export class UpdateProgramDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  label: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  value: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  description: string;
}
