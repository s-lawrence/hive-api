import { Controller, Post, Body, ValidationPipe, Get, Param, Query } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthCredentialsDto } from "./dto/auth-credentials.dto";
import { SignupInfoDto } from "./dto/signup-info.dto";
import { ApiTags } from "@nestjs/swagger";

/**
 * Auth Controller - Immediate interaction with client
 * side requests regarding account data. Handles Signin,
 * Signup and valid email requests.
 */
@ApiTags('Authorization')
@Controller("auth")
export class AuthController {

  /**
   * Instantiates auth controller with injected auth service
   * @param authService - itermediate between auth controller and the
   *                      repository dependencies.
   */
  constructor(private authService: AuthService) {}

  /**
   * Account creation method. Makes call to auth service to initiate account creation
   * @param signupInfoDto - Data transfer object restricting the data accepted 
   *                        for account sign up.
   * @returns JwtPayload for user authorization.
   */
  @Post("/signup")
  signUp(@Body(ValidationPipe) signupInfoDto: SignupInfoDto) {
    return this.authService.signUp(signupInfoDto);
  }

  /**
   * Account sign in method. Makes call to auth service to initiate account sign in.
   * @param authCredentialsDto - Data transfer object restricting the data accepted 
   *                             for sign in.
   */
  @Post("/signIn")
  signIn(
    @Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto
  ): Promise<{ accessToken: string }> {
    return this.authService.signIn(authCredentialsDto);
  }

  /**
   * Calls checkEmailExists in auth service.
   * @param email -  email address to check uniqueness of.
   */
  @Get("/checkEmailExists")
  checkEmailExists(@Query("email") email: string) {
    return this.authService.checkEmailExists(email);
  }
  
}
