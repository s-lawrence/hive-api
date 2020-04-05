import { Controller, UseGuards, Get, Param, Patch, Body, ValidationPipe } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { AccountService } from "./account.service";
import { UpdateAccountDto } from "./dto/update-account.dto";
import { ApiTags, ApiBearerAuth } from "@nestjs/swagger";
import { Account } from "./account.entity";

@ApiBearerAuth()
@ApiTags('Account')
@UseGuards(AuthGuard())
@Controller("account")
export class AccountController {
  constructor(private accountService: AccountService) {}
  
  @Get("/:id")
  getAccount(@Param("id") id: string) {
    return this.accountService.getAccount(id);
  }

  @Patch("/:id")
  updateAccount(
    @Param("id") id: string, 
    @Body(ValidationPipe) updateAccountDto: UpdateAccountDto
  ): Promise<Account> {
    return this.accountService.updateAccount(id, updateAccountDto);
  }

}
