import { Repository, EntityRepository, getRepository } from "typeorm";
import { Interest } from "./interest.entity";
import { CreateInterestDto } from "./dto/create-interest.dto";
import { UpdateInterestDto } from './dto/update-interest.dto'
import { ConflictException, InternalServerErrorException, UnauthorizedException } from "@nestjs/common";

/**
 * Interest repository - the interface to interact with
 * the Interest table in the database.
 * @method createInterest
 * @method updateInterest
 */
@EntityRepository(Interest)
export class InterestRepository extends Repository<Interest> {

  /**
   * Creates Interest tuple. Handles trimming and toLowerCase. 
   * @param createInterestDto - Data transfer object restricting the data accepted
   *                            for creating interest.
   * @returns Promise<Interest>
   * @throws {ConflictException} is name of interest trying to be added already exists.
   * @throws {InternalServerErrorException} if error occurs when attempting to save new Interest.
   */
  async createInterest(createInterestDto: CreateInterestDto): Promise<Interest> {
    const { name } = createInterestDto;
    await this.findOne({ name: name.toLowerCase().trim() }) 
      .then(confict => {
        if(confict) {
          throw new ConflictException("That interest already exists.")
        }
      })
    const interest = new Interest();
    interest.name = name.toLowerCase().trim();
    try {
      await interest.save();
      return interest;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException("There was an error creating the interest.")
    }
  }

  /**
   * Updates interest based of the name (key) provided. 
   * @param name - Name of the interest to retrieve
   * @param updateInterestDto - Data transfer object restricting the data accepted
   *                            for updating interest.
   * @throws {UnauthorizedException} when the key is attempted to be modified.
   * @throws {InternalServerErrorException} if error occurs when attempting to save new Interest.
   */
  async updateInterest(name: string, updateInterestDto: UpdateInterestDto): Promise<Interest> {
    return await this.findOne({ name }).then(async interest => {
      for (let [key, value] of Object.entries(updateInterestDto)) {
        if (key === "name") {
          throw new UnauthorizedException();
        }
        interest[key] = value;
      }
      try {
        await interest.save();
      } catch (error) {
        console.log(error);
        throw new InternalServerErrorException(
          "An error occured while updating the interest."
        );
      }
      return interest;
    });
  }
}