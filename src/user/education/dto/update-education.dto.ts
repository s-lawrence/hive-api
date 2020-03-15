import { IsString, IsDate, MaxLength } from "class-validator";


export class UpdateEducationDto {

  @MaxLength(50)
  school?: string;

  @MaxLength(30)
  degree?: string;

  startDate?: Date;

  endDate?: Date;

  @MaxLength(30)
  fieldOfStudy?: string;

  @MaxLength(10)
  grade?: string;

  @MaxLength(150)
  description?: string;
}