import { Injectable } from "@nestjs/common";
import { InterestRepository } from "./interest.repository";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateInterestDto } from "./dto/create-interest.dto";
import { Interest } from "./interest.entity";
import { UpdateInterestDto } from "./dto/update-interest.dto";
import { DeleteResult } from "typeorm";

@Injectable()
export class InterestService {
  constructor(
    @InjectRepository(InterestRepository)
    private interestRepository: InterestRepository
  ) {}

  createInterest(createInterestDto: CreateInterestDto): Promise<Interest> {
    return this.interestRepository.createInterest(createInterestDto);
  }

  async getInterest(name: string): Promise<Interest> {
    return await this.interestRepository.findOne({ name });
  }

  updateInterest(
    name: string,
    updateInterestDto: UpdateInterestDto
  ): Promise<Interest> {
    return this.interestRepository.updateInterest(name, updateInterestDto);
  }

  async deleteInterest(name: string): Promise<DeleteResult> {
    return await this.interestRepository.delete({ name });
  }
}
