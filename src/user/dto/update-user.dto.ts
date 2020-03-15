import { MaxLength, IsOptional } from "class-validator";
import { Education } from "../education/education.entity";

export class UpdateUserDto {

  @IsOptional()
  @MaxLength(20)
  firstName?: string;

  @IsOptional()
  @MaxLength(20)
  lastName?: string;

  @IsOptional()
  @MaxLength(40)
  fullName?: string;

  @IsOptional()
  @MaxLength(20)
  gender?: string;

  @IsOptional()
  @MaxLength(20)
  phoneNumber?: string;

  @IsOptional()
  @MaxLength(200)
  objective?: string;

  @IsOptional()
  @MaxLength(200)
  avatarUrl?: string;

  @IsOptional()
  education?: Education[];
}