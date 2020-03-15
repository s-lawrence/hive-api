import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from '../user/user.repository';
import { UserController } from './user.controller';
import { PassportModule } from '@nestjs/passport';
import { ExperienceRepository } from './experience/experience.repository';
import { EducationRepository } from './education/education.repository';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: "jwt" }),
    TypeOrmModule.forFeature([UserRepository, ExperienceRepository, EducationRepository]),
  ],
  providers: [UserService],
  exports: [UserService],
  controllers: [UserController]
})
export class UserModule {}
