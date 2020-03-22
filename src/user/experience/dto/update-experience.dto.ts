import { IsString, MaxLength, IsDate } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class UpdateExperienceDto {

  @ApiProperty()
  @MaxLength(30)
  jobTitle?: string;

  @ApiProperty()
  @MaxLength(30)
  companyName?: string;

  @ApiProperty()
  startDate?: Date;

  @ApiProperty()
  endDate?: Date;

  @ApiProperty()
  @MaxLength(150)
  description?: string;
}