import { EntityRepository, Repository, DeleteResult } from "typeorm";
import { Education } from "./education.entity";
import { UpdateEducationDto } from "./dto/update-education.dto";
import {
  UnauthorizedException,
  InternalServerErrorException
} from "@nestjs/common";
import { CreateEducationDto } from "./dto/create-education.dto";

@EntityRepository(Education)
export class EducationRepository extends Repository<Education> {
  async createUserEducation(
    userId: string,
    createEducationDto: CreateEducationDto
  ): Promise<Education> {
    const {
      degree,
      description,
      school,
      startDate,
      endDate,
      fieldOfStudy,
      grade
    } = createEducationDto;
    const education = new Education();
    education.degree = degree;
    education.description = description;
    education.school = school;
    education.startDate = startDate;
    education.endDate = endDate;
    education.fieldOfStudy = fieldOfStudy;
    education.grade = grade;
    education.userId = userId;
    try {
      return await education.save();
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException("Error creating education");
    }
  }

  async updateUserEducationById(
    userId: string,
    educationId: string,
    updateEducationDto: UpdateEducationDto
  ): Promise<Education> {
    return await this.findOne({ id: educationId }).then(async education => {
      if (education.userId !== userId) {
        throw new UnauthorizedException();
      }
      for (let [key, value] of Object.entries(updateEducationDto)) {
        if (key === "id") {
          throw new UnauthorizedException();
        }
        education[key] = value;
      }
      try {
        await education.save();
      } catch (error) {
        console.log(error);
        throw new InternalServerErrorException(
          "An error occured while updating the user education"
        );
      }
      return education;
    });
  }

  async deleteUserEducationById(
    userId: string,
    educationId: string
  ): Promise<DeleteResult> {
    return await this.delete({ id: educationId, userId });
  }
}
