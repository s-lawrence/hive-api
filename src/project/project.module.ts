import { Module } from '@nestjs/common';
import { ProjectController } from './project.controller';
import { ProjectService } from './project.service';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectRepository } from './project.repository';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: "jwt" }),
    TypeOrmModule.forFeature([ProjectRepository]),
  ],
  controllers: [ProjectController],
  providers: [ProjectService]
})
export class ProjectModule {}
