import { Injectable, UnauthorizedException, ConflictException, Inject, InternalServerErrorException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { AuthCredentialsDto } from "./dto/auth-credentials.dto";
import { JwtPayload } from "./jwt-payload.interface";
import { SignupInfoDto } from "./dto/signup-info.dto";
import { AccountService } from "../account/account.service";
import { UserService } from "../user/user.service";

@Injectable()
export class AuthService {
  constructor(
    @Inject(AccountService)
    private accountService: AccountService,
    @Inject(UserService)
    private userService: UserService,
    private jwtService: JwtService
  ) {}

  async signUp(signupInfoDto: SignupInfoDto): Promise<JwtPayload> {
    return await this.userService.createUser(signupInfoDto)
      .then(user => {
        return this.accountService.createAccount(user)
          .then(account => {
            const { email } = signupInfoDto;
            const payload: JwtPayload = { email, accountId: account.id };
            const accessToken = this.jwtService.sign(payload);
            return {
              accessToken
            };
          })
          .catch(error => {
            console.log(error);
            return error.message;
          });
      })
      .catch(error => {
        console.log(error);
        throw new InternalServerErrorException("This was an error creating the user enitity.")
      });;
  }

  async signIn(
    authCredentialDto: AuthCredentialsDto
  ): Promise<{ accessToken: string }> {
    const results = await this.userService.validateUserPassword(
      authCredentialDto
    );
    if (!results) {
      throw new UnauthorizedException("Invalid Credentials");
    }
    const { email, accountId } = results;
    const payload: JwtPayload = { email, accountId };
    const accessToken = await this.jwtService.sign(payload);
    return { accessToken };
  }

  async checkEmailExists(email: string) {
    const exists = await this.userService.checkEmailExists(email);
    if (exists) {
      throw new ConflictException("Email already exists!");
    }
  }
}
