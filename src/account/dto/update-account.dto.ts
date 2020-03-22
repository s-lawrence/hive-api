import { IsBooleanString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";


export class UpdateAccountDto {

  @ApiProperty({description: 'Used to track user onboarding.'})
  @IsBooleanString()
  isFirstTime: boolean;

}