import { IsString, MaxLength, IsDate } from "class-validator";

export class CreateExperienceDto {

  @MaxLength(30)
  @IsString()
  jobTitle: string;

  @MaxLength(30)
  @IsString()
  companyName: string;

  startDate: Date;

  endDate: Date;

  @MaxLength(150)
  @IsString()
  description: string;
}