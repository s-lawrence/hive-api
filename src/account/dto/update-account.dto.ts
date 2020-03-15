import { IsBooleanString } from "class-validator";


export class UpdateAccountDto {

  @IsBooleanString()
  isFirstTime: boolean;

}