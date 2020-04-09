import { Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { AccountRepository } from "./account.repository";
import { Account } from "./account.entity";
import { User } from "../user/user.entity";
import { UpdateAccountDto } from "./dto/update-account.dto";

/**
 * Account Service acts as an itermediate between account 
 * controller and the account repository. Non repository essential
 * logic is handled here.
 * @method createAccount
 * @method updateAccount
 */
@Injectable()
export class AccountService {

  /**
   * Creates instance of Account Service
   * @param accountRepository - Injectable dependency that handles database manipulation. 
   */
  constructor(
    @InjectRepository(AccountRepository)
    private accountRepository: AccountRepository
  ) {}

  /**
   * Makes call to Account Repository to create account.
   * @param user - User entity to be associated to the account.
   */
  async createAccount(user: User): Promise<Account> {
    return await this.accountRepository.createAccount(user);
  }

  /**
   * Makes call to Account Repository to get account by ID.
   * @param id - Account ID, primary key for account entity
   */
  async getAccount(id: string): Promise<Account> {
    return await this.accountRepository.findOne({ id });
  }

  /**
   * Makes call to Account Repository to delete account by ID.
   * @param id - Account ID, primary key for account entity
   */
  async deleteAccount(id: string): Promise<void> {
    this.accountRepository.delete({ id });
  }

  /**
   * Makes call to Account Repository to update account.
   * @param id - Account ID, primary key for account entity
   * @param updateAccountDto - Data transfer object restricting the data accepted 
   *                           for account update.
   */
  async updateAccount(
    id: string,
    updateAccountDto: UpdateAccountDto
  ): Promise<Account> {
    return this.accountRepository.updateAccount(id, updateAccountDto);
  }
}
