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

/**
 * Auth module, dependencies and exports are declared here
 * @requires PassportModule
 * @requires JwtModule
 * @requires TypeOrmModule
 * @requires AccountModule
 * @requires UserModule
 */
@Module({
  imports: [
    PassportModule.register({ defaultStrategy: "jwt" }),
    JwtModule.register({
      secret: process.env.JWT_SECRET || "We are the priests of the temples of syrinx our great computers fill the hallowed halls",
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
