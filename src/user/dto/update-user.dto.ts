import { MaxLength, IsOptional } from "class-validator";
import { Education } from "../education/education.entity";
import { ApiProperty } from "@nestjs/swagger";

export class UpdateUserDto {

  @ApiProperty()
  @IsOptional()
  @MaxLength(20)
  firstName?: string;

  @ApiProperty()
  @IsOptional()
  @MaxLength(20)
  lastName?: string;

  @ApiProperty()
  @IsOptional()
  @MaxLength(40)
  fullName?: string;

  @ApiProperty()
  @IsOptional()
  @MaxLength(20)
  gender?: string;

  @ApiProperty()
  @IsOptional()
  @MaxLength(20)
  phoneNumber?: string;

  @ApiProperty({ description: "The users profile objective." })
  @IsOptional()
  @MaxLength(200)
  objective?: string;

  @ApiProperty()
  @IsOptional()
  @MaxLength(200)
  avatarUrl?: string;

  @ApiProperty()
  @IsOptional()
  education?: Education[];
}