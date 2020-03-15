import { Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { AccountRepository } from "./account.repository";
import { Account } from "./account.entity";
import { User } from "../user/user.entity";
import { UpdateAccountDto } from "./dto/update-account.dto";

@Injectable()
export class AccountService {
  constructor(
    @InjectRepository(AccountRepository)
    private accountRepository: AccountRepository
  ) {}

  async createAccount(user: User): Promise<Account> {
    return await this.accountRepository.createAccount(user);
  }

  async getAccount(id: string): Promise<Account> {
    return await this.accountRepository.findOne({ id });
  }

  async deleteAccount(id: string): Promise<void> {
    this.accountRepository.delete({ id });
  }

  async updateAccount(id: string, updateAccountDto: UpdateAccountDto) {
    this.accountRepository.updateAccount(id, updateAccountDto);
  }
}
