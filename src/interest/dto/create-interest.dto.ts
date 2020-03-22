import { IsString, MaxLength, IsNotEmpty } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateInterestDto {
  @ApiProperty({ description: "The name of the interest." })
  @IsString()
  @MaxLength(25)
  @IsNotEmpty()
  name: string;
}
