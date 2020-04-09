import { Injectable, UnauthorizedException, ConflictException, Inject, InternalServerErrorException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { AuthCredentialsDto } from "./dto/auth-credentials.dto";
import { JwtPayload } from "./jwt-payload.interface";
import { SignupInfoDto } from "./dto/signup-info.dto";
import { AccountService } from "../account/account.service";
import { UserService } from "../user/user.service";

/**
 * Auth Service acts as an itermediate between auth 
 * controller and the account module and the user module. 
 * Non-module essential logic is handled here. 
 * @requires AccountService
 * @requires UserService
 * @requires JwtService
 * @method signUp
 * @method signIn
 * @method checkEmailExists
 */
@Injectable()
export class AuthService {

  constructor(
    @Inject(AccountService)
    private accountService: AccountService,
    @Inject(UserService)
    private userService: UserService,
    private jwtService: JwtService
  ) {}

  /**
   * Makes call to user service to create a new user entity. Passes
   * the created user instance to account service for a new account to
   * be instantiated. Creates JwtPayload containing user email, and 
   * account ID and returns as access token.
   * @param signupInfoDto Data transfer object restricting the data accepted 
   *                      for account sign up.
   * @throws {InternalServerErrorException} when creation of new user fails
   */
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

  /**
   * Uses User service to validate the email and password provided.
   * @param authCredentialDto - Data transfer object restricting the data accepted 
   *                            for sign in.
   * @returns Promise<{accessToken}>
   * @throws {UnauthorizedException} when credentials fail validation
   */
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

  /**
   * Checks if the provided email has been used to create an account already.
   * Uses User service to checkEmailExists.
   * @param email -  email address to check uniqueness of.
   * @throws {ConflictException} if the email already exists in the User database table.
   */
  async checkEmailExists(email: string) {
    const exists = await this.userService.checkEmailExists(email);
    if (exists) {
      throw new ConflictException("Email already exists!");
    }
  }
}
