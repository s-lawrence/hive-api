import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { AuthModule } from './auth/auth.module';
import { AccountModule } from './account/account.module';
import { ProjectModule } from './project/project.module';
import { UserModule } from './user/user.module';
import { InterestModule } from './interest/interest.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    AuthModule,
    AccountModule,
    ProjectModule,
    UserModule,
    InterestModule,
  ]
})
export class AppModule {}
