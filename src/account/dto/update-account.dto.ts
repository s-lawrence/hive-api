import { IsBoolean, IsOptional } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

/**
 * Data transfer object for account updates, 
 * validates and restricts data sent to server.
 * 
 * @property isFirstTime
 * @property enabled
 */
export class UpdateAccountDto {

  @ApiProperty({description: 'Used to track user onboarding.'})
  @IsOptional()
  @IsBoolean()
  isFirstTime: boolean;

  @ApiProperty({description: 'Used to track status of account.'})
  @IsOptional()
  @IsBoolean()
  enabled: boolean;
}