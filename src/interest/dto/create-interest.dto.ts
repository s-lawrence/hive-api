import { IsString, MaxLength, IsNotEmpty } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

/**
 * Data transfer object for Interest creation, 
 * validates and restricts data sent to server.
 * 
 * @property name
 */
export class CreateInterestDto {
  @ApiProperty({ description: "The name of the interest." })
  @IsString()
  @MaxLength(25)
  @IsNotEmpty()
  name: string;
}
