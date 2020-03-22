import { IsString, MaxLength } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";


export class CreateEducationDto {

  @ApiProperty()
  @IsString()
  @MaxLength(50)
  school: string;

  @ApiProperty()
  @IsString()
  @MaxLength(30)
  degree: string;

  @ApiProperty()
  startDate: Date;

  @ApiProperty()
  endDate: Date;

  @ApiProperty()
  @IsString()
  @MaxLength(30)
  fieldOfStudy: string;

  @ApiProperty()
  @IsString()
  @MaxLength(10)
  grade: string;

  @ApiProperty()
  @IsString()
  @MaxLength(150)
  description: string;
}