import { Experience } from "./experience.entity";
import { Repository, EntityRepository } from "typeorm";
import { CreateExperienceDto } from "./dto/create-experience.dto";
import {
  InternalServerErrorException,
  UnauthorizedException
} from "@nestjs/common";
import { UpdateExperienceDto } from "./dto/update-experience.dto";

@EntityRepository(Experience)
export class ExperienceRepository extends Repository<Experience> {
  async getUserExperience(userId: string): Promise<Experience[]> {
    return await this.createQueryBuilder("experience")
      .where("experience.userId = :userId", { userId })
      .getMany();
  }

  async createUserExperience(
    userId: string,
    createExperienceDto: CreateExperienceDto
  ): Promise<Experience> {
    const {
      jobTitle,
      companyName,
      startDate,
      endDate,
      description
    } = createExperienceDto;
    const experience = new Experience();
    experience.userId = userId;
    experience.jobTitle = jobTitle;
    experience.companyName = companyName;
    experience.startDate = startDate;
    experience.endDate = endDate;
    experience.description = description;
    try {
      return await experience.save();
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException("Error creating experience");
    }
  }

  async updateUserExperienceById(
    userId: string,
    experienceId: string,
    updateExperienceDto: UpdateExperienceDto
  ): Promise<Experience> {
    return await this.findOne({ id: experienceId, userId }).then(
      async experience => {
        for (let [key, value] of Object.entries(updateExperienceDto)) {
          if (key === "id") {
            throw new UnauthorizedException();
          }
          experience[key] = value;
        }
        try {
          await experience.save();
        } catch (error) {
          console.log(error);
          throw new InternalServerErrorException(
            "An error occured while updating experience"
          );
        }
        return experience;
      }
    );
  }
}
