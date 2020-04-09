import { IsString, MinLength, MaxLength, Matches } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

/**
 * Data transfer object for signing in.
 * Validates and restricts data sent to server.
 * 
 * @property email
 * @property password
 */
export class AuthCredentialsDto {
  @ApiProperty()
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  email: string;

  /*
  Passwords will contain at least 1 upper case letter
  Passwords will contain at least 1 lower case letter
  Passwords will contain at least 1 number or special character
  There is no length validation (min, max) in this regex!
  */
  @ApiProperty()
  @IsString()
  @MinLength(8)
  @MaxLength(20)
  password: string;
}
