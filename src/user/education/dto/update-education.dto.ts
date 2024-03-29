import { MaxLength, IsOptional } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";


export class UpdateEducationDto {

  @ApiProperty()
  @IsOptional()
  @MaxLength(50)
  school: string;

  @ApiProperty()
  @IsOptional()
  @MaxLength(30)
  degree: string;

  @ApiProperty()
  @IsOptional()
  startDate: Date;

  @ApiProperty()
  @IsOptional()
  endDate: Date;

  @ApiProperty()
  @IsOptional()
  @MaxLength(30)
  fieldOfStudy: string;

  @ApiProperty()
  @IsOptional()
  @MaxLength(10)
  grade: string;

  @ApiProperty()
  @IsOptional()
  @MaxLength(150)
  description?: string;
}