import { Matches, IsOptional } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class UpdateProjectDto {
  @ApiProperty()
  title?: string;
  @ApiProperty()
  description?: string;
  @ApiProperty({ description: " Value may be 'paid', 'volunteer' or 'invest" })
  @IsOptional()
  @Matches(/\b(paid|volunteer|invest)\b/)
  projectType?: string;
  @ApiProperty()
  interestsString?: string;
  @ApiProperty()
  completed: boolean;
}
