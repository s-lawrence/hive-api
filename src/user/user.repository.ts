import {
  EntityRepository,
  Repository,
  getRepository,
  DeleteResult
} from "typeorm";
import { User } from "./user.entity";
import { AuthCredentialsDto } from "../auth/dto/auth-credentials.dto";
import * as bcrypt from "bcrypt";
import {
  ConflictException,
  UnauthorizedException,
  InternalServerErrorException
} from "@nestjs/common";
import { SignupInfoDto } from "../auth/dto/signup-info.dto";
import { SigninDto } from "../auth/dto/signin.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { Education } from "./education/education.entity";
import { UpdateEducationDto } from "./education/dto/update-education.dto";
import { Experience } from "./experience/experience.entity";
import { CreateExperienceDto } from "./experience/dto/create-experience.dto";
import { Interest } from "src/interest/interest.entity";

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async createUser(signupInfoDto: SignupInfoDto): Promise<User> {
    const { email, password, firstName, lastName } = signupInfoDto;

    const exists = await this.findOne({ email });
    if (exists) {
      throw new ConflictException("Email already exists!");
    }

    const user = new User();
    user.email = email;
    user.salt = await bcrypt.genSalt();
    user.password = await this.hashPassword(password, user.salt);
    user.firstName = firstName;
    user.lastName = lastName;
    user.fullName = `${firstName} ${lastName}`;
    user.education = [];
    user.projects = [];
    user.interests = [];
    user.experience = [];

    return user;
  }

  async updateUser(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    return await this.findOne({ id }).then(async user => {
      for (let [key, value] of Object.entries(updateUserDto)) {
        if (key === "id") {
          throw new UnauthorizedException();
        }
        user[key] = value;
      }
      try {
        await user.save();
      } catch (error) {
        console.log(error);
        throw new InternalServerErrorException(
          "An error occured while updating user"
        );
      }
      return user;
    });
  }

  async addUserEducation(id: string, education: Education[]): Promise<User> {
    return await this.findOne({ id }).then(async user => {
      for (let edu of education) {
        const newEdu = new Education();
        newEdu.degree = edu.degree;
        newEdu.description = edu.description;
        newEdu.school = edu.school;
        newEdu.startDate = edu.startDate;
        newEdu.endDate = edu.endDate;
        newEdu.fieldOfStudy = edu.fieldOfStudy;
        newEdu.grade = edu.grade;
        newEdu.userId = id;
        if (user.education) {
          user.education = [...user.education, newEdu];
        } else {
          user.education = [newEdu];
        }
      }
      const existingEducation = await getRepository(Education)
        .createQueryBuilder("education")
        .where("education.userId = :id", { id })
        .getMany();
      user.education = [...existingEducation, ...user.education];
      try {
        user.save();
        return user;
      } catch (error) {
        console.log(error);
        throw new InternalServerErrorException(
          "Error updating users education"
        );
      }
    });
  }

  async addUserExperience(
    userId: string,
    experience: Experience[]
  ): Promise<User> {
    return await this.findOne({ id: userId }).then(async user => {
      for (let exp of experience) {
        const newExp = new Experience();
        newExp.jobTitle = exp.jobTitle;
        newExp.companyName = exp.companyName;
        newExp.startDate = exp.startDate;
        newExp.endDate = exp.endDate;
        newExp.description = exp.description;
        if (user.experience) {
          user.experience = [...user.experience, newExp];
        } else {
          user.experience = [newExp];
        }
      }
      const existingExperience = await getRepository(Experience)
        .createQueryBuilder("experience")
        .where("experience.userId = :userId", { userId })
        .getMany();
      user.experience = [...existingExperience, ...user.experience];
      try {
        user.save();
        return user;
      } catch (error) {
        console.log(error);
        throw new InternalServerErrorException(
          "Error updating users experience"
        );
      }
    });
  }

  async addUserInterests(userId: string, interests: string[]) {
    return await this.findOne({ id: userId }).then(async user => {
      for (let interest of interests) {
        const existing = await getRepository(Interest).findOne(interest);
        if (existing) {
          user.interests = user.interests
            ? [...user.interests, existing]
            : [existing];
        } else {
          const newInterest = new Interest();
          newInterest.name = interest.toLowerCase();
          user.interests = user.interests
            ? [...user.interests, newInterest]
            : [newInterest];
        }
      }
      try {
        user.save();
        return user;
      } catch (error) {
        console.log(error);
        throw new InternalServerErrorException(
          "This was an error adding the interests to the user: " + error
        );
      }
    });
  }

  async validateUserPassword(
    authCredentialsDto: AuthCredentialsDto
  ): Promise<SigninDto> {
    const { email, password } = authCredentialsDto;
    const user = await this.createQueryBuilder("user")
      .where("user.email = :email", { email })
      .select("user")
      .addSelect("user.password")
      .addSelect("user.salt")
      .getOne();
    if (user && await user.validatePassword(password)) {
      return {
        email: user.email,
        accountId: user.accountId
      };
    } else {
      return null;
    }
  }

  private async hashPassword(password: string, salt: string): Promise<string> {
    return await bcrypt.hash(password, salt);
  }
}
