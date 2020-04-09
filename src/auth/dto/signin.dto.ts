import { IsNotEmpty, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

/**
 * Data transfer object for returning data back 
 * upon signin. This data is put into JWT payload 
 * and returned to client side.
 * 
 * @property email
 * @property accountId
 */
export class SigninDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  accountId: string;
}