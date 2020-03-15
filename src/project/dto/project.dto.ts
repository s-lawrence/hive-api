import { IsString, MaxLength, Matches } from "class-validator";

export class ProjectDto {

  @MaxLength(80)
  @IsString()
  title: string;

  @MaxLength(300)
  @IsString()
  description: string;

  @MaxLength(20)
  @IsString()
  @Matches(/\b(paid|volunteer|invest)\b/)
  projectType: string;

  interests: string[];
}