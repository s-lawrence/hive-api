import {
  IsString,
  MaxLength,
  MinLength,
  Matches,
  IsEmail,
  IsNotEmpty
} from "class-validator";

export class SignupInfoDto {
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
  @IsString()
  @MinLength(8)
  @MaxLength(20)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: "Password to weak"
  })
  password: string;

  @IsString()
  @MinLength(2)
  @MaxLength(15)
  firstName: string;

  @IsString()
  @MinLength(2)
  @MaxLength(15)
  lastName: string;
}
