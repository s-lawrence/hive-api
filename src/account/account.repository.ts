import { Repository, EntityRepository } from "typeorm";
import { Account } from "./account.entity";
import { User } from "../user/user.entity";
import {
  InternalServerErrorException,
  UnauthorizedException,
} from "@nestjs/common";
import { UpdateAccountDto } from "./dto/update-account.dto";

/**
 * Account repository - the interface to interact with
 * the Account table in the database.
 * @method createAccount
 * @method updateAccount
 */
@EntityRepository(Account)
export class AccountRepository extends Repository<Account> {

  /**
   * Creates the account tuple in the database
   * Account table. 
   * @param user - User entity to be associated to the account.
   * @throws {InternalServerErrorException} when an error occurs while attempting to save account
   */
  async createAccount(user: User): Promise<Account> {
    const account = new Account();
    account.isFirstTime = true;
    account.enabled = true;
    account.user = user;
    console.log(account);
    try {
      await account.save();
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(
        "An error occured while creating your account"
      );
    }
    return account;
  }

  /**
   * Used to update Account attributes
   * @param id - Primary key for account, used for unique identification
   * @param updateAccountDto - Data transfer object restricting the data accepted 
   *                           for account update.
   * @returns Promise<Account>
   * @throws {InternalServerErrorException} when an error occurs while attempting to save account
   * @throws {UnauthorizedException} when the id is attempted to be modified
   */
  async updateAccount(
    id: string,
    updateAccountDto: UpdateAccountDto
  ): Promise<Account> {
    return this.findOne({ id }).then(async (account) => {
      for (let [key, value] of Object.entries(updateAccountDto)) {
        if (key === "id") {
          throw new UnauthorizedException();
        }
        account[key] = value;
      }
      try {
        return await account.save();
      } catch (error) {
        console.log(error);
        throw new InternalServerErrorException(
          "An error occured while updating your account"
        );
      }
    });
  }
}
