import { IsString, MaxLength, Matches, IsOptional } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class ProjectDto {
  @ApiProperty()
  @MaxLength(80)
  @IsString()
  title: string;

  @ApiProperty()
  @MaxLength(1000)
  @IsString()
  description: string;

  @ApiProperty({ description: " Value may be 'paid', 'volunteer' or 'invest" })
  @MaxLength(20)
  @IsString()
  @Matches(/\b(paid|volunteer|invest)\b/)
  projectType: string;

  @ApiProperty()
  interestsString: string;

  @IsOptional()
  media: any;

}
