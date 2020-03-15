import { IsString, MaxLength, IsDate } from "class-validator";

export class UpdateExperienceDto {

  @MaxLength(30)
  jobTitle?: string;

  @MaxLength(30)
  companyName?: string;

  startDate?: Date;

  endDate?: Date;

  @MaxLength(150)
  description?: string;
}