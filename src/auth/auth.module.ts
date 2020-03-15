import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserRepository } from "../user/user.repository";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { JwtStrategy } from './jwt.strategy';
import { AccountModule } from 'src/account/account.module';
import { UserModule } from '../user/user.module';
// import { JwtStrategy } from "./jwt.strategy";

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: "jwt" }),
    JwtModule.register({
      secret: "We are the priests of the temples of syrinx our great computers fill the hallowed halls",
      signOptions: {
        expiresIn: 3600
      }
    }),
    TypeOrmModule.forFeature([UserRepository]),
    AccountModule,
    UserModule
  ],
  controllers: [AuthController],
  providers: [AuthService , JwtStrategy],
  exports: [
    PassportModule,
    JwtStrategy
  ]
})
export class AuthModule {}
