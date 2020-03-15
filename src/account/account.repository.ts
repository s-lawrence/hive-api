import { Repository, EntityRepository } from "typeorm";
import { Account } from "./account.entity";
import { User } from "../user/user.entity";
import { InternalServerErrorException, UnauthorizedException } from "@nestjs/common";
import { UpdateAccountDto } from "./dto/update-account.dto";

@EntityRepository(Account)
export class AccountRepository extends Repository<Account> {
  async createAccount(
    user: User
  ): Promise<Account> {
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

  async updateAccount(id: string, updateAccountDto: UpdateAccountDto) {
    this.findOne({ id }).then(async account => {
      for (let [key, value] of Object.entries(updateAccountDto)) {
        if (key === "id") {
          throw new UnauthorizedException();
        }
        account[key] = value;
      }
      try {
        await account.save();
      } catch (error) {
        console.log(error);
        throw new InternalServerErrorException(
          "An error occured while updating your account"
        );
      }
      return account;
    });
  }
}
