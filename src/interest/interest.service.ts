import { Injectable } from "@nestjs/common";
import { InterestRepository } from "./interest.repository";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateInterestDto } from "./dto/create-interest.dto";
import { Interest } from "./interest.entity";
import { UpdateInterestDto } from "./dto/update-interest.dto";
import { DeleteResult } from "typeorm";

/**
 * Interest Service acts as an itermediate between the interest 
 * controller and the interest repository. Non repository essential
 * logic is handled here.
 * @requires InterestRepository
 * @method createInterest
 * @method getInterest
 * @method updateInterest
 * @method deleteInterest
 */
@Injectable()
export class InterestService {
  constructor(
    @InjectRepository(InterestRepository)
    private interestRepository: InterestRepository
  ) {}

  /**
   * Calls InterestRepository to create new interest
   * @param createInterestDto - Data transfer object restricting the data accepted
   *                            for creating interest.
   * @returns Promise<Interest> 
   */
  createInterest(createInterestDto: CreateInterestDto): Promise<Interest> {
    return this.interestRepository.createInterest(createInterestDto);
  }

  /**
   * Calls InterestRepository to retrieve interest by name (key).
   * @param name - Name of interest to retrieve.
   * @returns Promise<Interest>  
   */
  async getInterest(name: string): Promise<Interest> {
    return await this.interestRepository.findOne({ name });
  }

  /**
   * Calls InterestRepository to update interest by name (key).
   * @param name - Name of interest to be updated. 
   * @param updateInterestDto - Data transfer object restricting the data accepted
   *                            for updating interest.
   * @returns Promise<Interest> 
   */
  updateInterest(
    name: string,
    updateInterestDto: UpdateInterestDto
  ): Promise<Interest> {
    return this.interestRepository.updateInterest(name, updateInterestDto);
  }

  /**
   * Calls InterestRepository to delete interest by name (key).
   * @param name - Name of interest to be deleted. 
   * @returns Promise<DeleteResult> 
   */
  async deleteInterest(name: string): Promise<DeleteResult> {
    return await this.interestRepository.delete({ name });
  }
}
