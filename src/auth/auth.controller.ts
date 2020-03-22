import { Controller, Post, Body, ValidationPipe, Get, Param, Query } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthCredentialsDto } from "./dto/auth-credentials.dto";
import { SignupInfoDto } from "./dto/signup-info.dto";
import { ApiTags } from "@nestjs/swagger";

@ApiTags('Authorization')
@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post("/signup")
  signUp(@Body(ValidationPipe) signupInfoDto: SignupInfoDto) {
    return this.authService.signUp(signupInfoDto);
  }

  @Post("/signIn")
  signIn(
    @Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto
  ): Promise<{ accessToken: string }> {
    return this.authService.signIn(authCredentialsDto);
  }

  @Get("/checkEmailExists")
  checkEmailExists(@Query("email") email: string) {
    return this.authService.checkEmailExists(email);
  }
  
}
