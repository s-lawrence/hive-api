import { Module } from '@nestjs/common';
import { InterestController } from './interest.controller';
import { InterestService } from './interest.service';
import { PassportModule } from '@nestjs/passport';
import { InterestRepository } from './interest.repository';
import { TypeOrmModule } from '@nestjs/typeorm';

/**
 * Interest module, dependencies and exports are declared here
 * @requires PassportModule
 * @requires TypeOrmModule
 */
@Module({
  imports:[
    PassportModule.register({ defaultStrategy: "jwt" }),
    TypeOrmModule.forFeature([InterestRepository]),
  ],
  controllers: [InterestController],
  providers: [InterestService]
})
export class InterestModule {}
