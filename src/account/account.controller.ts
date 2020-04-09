import { Controller, UseGuards, Get, Param, Patch, Body, ValidationPipe } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { AccountService } from "./account.service";
import { UpdateAccountDto } from "./dto/update-account.dto";
import { ApiTags, ApiBearerAuth } from "@nestjs/swagger";
import { Account } from "./account.entity";

/**
 * Account Controller - Immediate interaction with client
 * side requests regarding account data.
 */
@ApiBearerAuth()
@ApiTags('Account')
@UseGuards(AuthGuard())
@Controller("account")
export class AccountController {

  /**
   * Creates instance of AccountController with neccessary properties
   * @param accountService - itermediate between account controller and the account repository. 
   */
  constructor(private accountService: AccountService) {}
  
  /**
   * Retrieves a single acccount based off their unique ID.
   * @param id - Account ID, primary key for account entity
   * @returns Promise<Account>
   */
  @Get("/:id")
  getAccount(@Param("id") id: string) {
    return this.accountService.getAccount(id);
  }

  /**
   * Updates single account bases of account ID. Calls AccountService to update account.
   * @param id - Account ID, primary key for account entity
   * @param updateAccountDto - Data transfer object restricting the data accepted 
   *                           for account update.
   * @returns Promise<Account>
   */
  @Patch("/:id")
  updateAccount(
    @Param("id") id: string, 
    @Body(ValidationPipe) updateAccountDto: UpdateAccountDto
  ): Promise<Account> {
    return this.accountService.updateAccount(id, updateAccountDto);
  }

}
