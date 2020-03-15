import { IsString, MaxLength, IsNotEmpty } from "class-validator";

export class CreateInterestDto {

  @IsString()
  @MaxLength(25)
  @IsNotEmpty()
  name: string;
}