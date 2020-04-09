import {
  IsString,
  MaxLength,
  MinLength,
  Matches,
  IsEmail,
  IsNotEmpty
} from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

/**
 * Data transfer object for signing up.
 * Validates and restricts data sent to server.
 * @property email
 * @property password
 * @property firstname
 * @property lastname
 */
export class SignupInfoDto {

  /**
   * Must be valid and unique email
   */
  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  /*
  Passwords will contain at least 1 upper case letter
  Passwords will contain at least 1 lower case letter
  Passwords will contain at least 1 number or special character
  Min length of 8
  Max length of 20
  */
 @ApiProperty(
   {
     description: "Passwords must contain at least 1 upper case letter"
     + " At least 1 lower case letter"
     + " At least 1 number or special character"
     + " Min length of 8"
     + " Max length of 20"
   }
 )
  @IsString()
  @MinLength(8)
  @MaxLength(20)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: "Password to weak"
  })
  password: string;

  @ApiProperty()
  @IsString()
  @MinLength(2)
  @MaxLength(15)
  firstName: string;

  @ApiProperty()
  @IsString()
  @MinLength(2)
  @MaxLength(15)
  lastName: string;
}
