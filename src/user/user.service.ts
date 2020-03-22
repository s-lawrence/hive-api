import { Injectable, NotFoundException } from "@nestjs/common";
import { SignupInfoDto } from "../auth/dto/signup-info.dto";
import { User } from "./user.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { UserRepository } from "./user.repository";
import { AuthCredentialsDto } from "../auth/dto/auth-credentials.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { Education } from "./education/education.entity";
import { DeleteResult } from "typeorm";
import { UpdateEducationDto } from "./education/dto/update-education.dto";
import { ExperienceRepository } from "./experience/experience.repository";
import { Experience } from "./experience/experience.entity";
import { CreateExperienceDto } from "./experience/dto/create-experience.dto";
import { UpdateExperienceDto } from "./experience/dto/update-experience.dto";
import { EducationRepository } from "./education/education.repository";
import { CreateEducationDto } from "./education/dto/create-education.dto";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    @InjectRepository(ExperienceRepository)
    private experienceRepository: ExperienceRepository,
    @InjectRepository(EducationRepository)
    private educationRepository: EducationRepository
  ) {}

  async createUser(signupInfoDto: SignupInfoDto): Promise<User> {
    return await this.userRepository.createUser(signupInfoDto);
  }

  async getUser(id: string): Promise<User> {
    return await this.userRepository
      .createQueryBuilder("user")
      .leftJoinAndSelect("user.education", "education")
      .leftJoinAndSelect("user.interests", "interest")
      .leftJoinAndSelect("user.ownedProjects", "project")
      .leftJoinAndSelect("user.experience", "experience")
      .where("user.id = :id", { id })
      .getOne();
  }

  async updateUser(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    return await this.userRepository.updateUser(id, updateUserDto);
  }

  async getUserEducation(id: string): Promise<Education[]> {
    return await this.educationRepository
      .createQueryBuilder("education")
      .where("education.userId = :id", { id })
      .getMany();
  }

  async addUserEducation(id: string, education: Education[]): Promise<User> {
    return await this.userRepository.addUserEducation(id, education);
  }

  async createUserEducation(
    userId: string,
    createEducationDto: CreateEducationDto
  ): Promise<Education> {
    return this.educationRepository.createUserEducation(userId,  createEducationDto);
  }

  async updateUserEducationById(
    userId: string,
    educationId: string,
    updateEducationDto: UpdateEducationDto
  ): Promise<Education> {
    return await this.educationRepository.updateUserEducationById(
      userId,
      educationId,
      updateEducationDto
    );
  }

  async deleteUserEducationById(
    userId: string,
    educationId: string
  ): Promise<DeleteResult> {
    return await this.educationRepository.deleteUserEducationById(
      userId,
      educationId
    );
  }

  async addUserExperience(
    userId: string,
    experience: Experience[]
  ): Promise<User> {
    return await this.userRepository.addUserExperience(userId, experience);
  }

  async createUserExperience(
    userId: string,
    createExperienceDto: CreateExperienceDto
  ): Promise<Experience> {
    return this.experienceRepository.createUserExperience(
      userId,
      createExperienceDto
    );
  }

  async getUserExperience(userId: string): Promise<Experience[]> {
    return await this.experienceRepository.getUserExperience(userId);
  }

  async getUserExperienceById(
    userId: string,
    experienceId: string
  ): Promise<Experience> {
    return this.experienceRepository.findOne({ id: experienceId, userId });
  }

  updateUserExperienceById(
    userId: string,
    experienceId: string,
    updateExperienceDto: UpdateExperienceDto
  ): Promise<Experience> {
    return this.experienceRepository.updateUserExperienceById(
      userId,
      experienceId,
      updateExperienceDto
    );
  }

  async deleteUserExperienceById(
    userId: string,
    experienceId: string
  ): Promise<DeleteResult> {
    return await this.experienceRepository
      .delete({
        id: experienceId,
        userId
      })
      .catch(error => {
        console.log(error);
        throw new NotFoundException();
      });
  }

  async addUserInterests(userId: string, interests: string[]) {
    return this.userRepository.addUserInterests(userId, interests);
  }

  async validateUserPassword(authCredentialDto: AuthCredentialsDto) {
    return await this.userRepository.validateUserPassword(authCredentialDto);
  }

  async checkEmailExists(email: string) {
    return await this.userRepository.findOne({ email });
  }
}
