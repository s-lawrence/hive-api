import { Matches, IsOptional } from "class-validator";

export class UpdateProjectDto {

  title?: string;
  description?: string;
  @IsOptional()
  @Matches(/\b(paid|volunteer|invest)\b/)
  projectType?: string;
  interests?: string[];
  completed: boolean;
}