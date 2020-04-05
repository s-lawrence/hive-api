import { Repository, EntityRepository, getRepository } from "typeorm";
import { Interest } from "./interest.entity";
import { CreateInterestDto } from "./dto/create-interest.dto";
import { UpdateInterestDto } from './dto/update-interest.dto'
import { ConflictException, InternalServerErrorException, UnauthorizedException } from "@nestjs/common";

@EntityRepository(Interest)
export class InterestRepository extends Repository<Interest> {

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