import { ApiProperty } from "@nestjs/swagger";
import { IsNumber } from "class-validator";

/**
 * Defines the create client program relationship payload
 */
export class CreateClientProgramDto {
  @ApiProperty()
  @IsNumber()
  clientId: number;

  @ApiProperty()
  @IsNumber()
  programId: number;
}