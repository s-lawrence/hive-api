import { IsString, MaxLength, IsDate } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateExperienceDto {

  @ApiProperty()
  @MaxLength(30)
  @IsString()
  jobTitle: string;

  @ApiProperty()
  @MaxLength(30)
  @IsString()
  companyName: string;

  @ApiProperty()
  startDate: Date;

  @ApiProperty()
  endDate: Date;

  @ApiProperty()
  @MaxLength(150)
  @IsString()
  description: string;
}