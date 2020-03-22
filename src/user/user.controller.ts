import {
  Controller,
  UseGuards,
  Get,
  Param,
  Patch,
  ValidationPipe,
  Body,
  Delete,
  Post
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { UserService } from "./user.service";
import { User } from "./user.entity";
import { UpdateUserDto } from "./dto/update-user.dto";
import { Education } from "./education/education.entity";
import { UpdateEducationDto } from "./education/dto/update-education.dto";
import { DeleteResult } from "typeorm";
import { Experience } from "./experience/experience.entity";
import { CreateExperienceDto } from "./experience/dto/create-experience.dto";
import { UpdateExperienceDto } from "./experience/dto/update-experience.dto";
import { ApiTags, ApiBearerAuth } from "@nestjs/swagger";
import { CreateEducationDto } from "./education/dto/create-education.dto";


@ApiBearerAuth()
@ApiTags('User')
@UseGuards(AuthGuard())
@Controller("user")
export class UserController {
  constructor(private userService: UserService) {}

  @Get("/:id")
  getUser(@Param("id") id: string): Promise<User> {
    return this.userService.getUser(id);
  }

  @Patch("/:id")
  updateUser(
    @Param("id") id: string,
    @Body(ValidationPipe) updateUserDto: UpdateUserDto
  ): Promise<User> {
    return this.userService.updateUser(id, updateUserDto);
  }

  @Patch("/:id/education")
  addUserEducation(
    @Param("id") id: string,
    @Body() education: Education[]
  ): Promise<User> {
    return this.userService.addUserEducation(id, education);
  }

  @Post("/:userId/education")
  createUserEducation(
    @Param("userId") userId: string,
    @Body(ValidationPipe) createEducationDto: CreateEducationDto
  ): Promise<Education> {
    return this.userService.createUserEducation(userId, createEducationDto);
  }

  @Get("/:id/education")
  getUserEducation(@Param("id") id: string): Promise<Education[]> {
    return this.userService.getUserEducation(id);
  }

  @Patch("/:userId/education/:educationId")
  updateUserEducationById(
    @Param("userId") userId: string,
    @Param("educationId") educationId: string,
    @Body(ValidationPipe) updateEducationDto: UpdateEducationDto
  ): Promise<Education> {
    return this.userService.updateUserEducationById(
      userId,
      educationId,
      updateEducationDto
    );
  }

  @Delete("/:userId/education/:educationId")
  deleteUserEducationById(
    @Param("userId") userId: string,
    @Param("educationId") educationId: string
  ): Promise<DeleteResult> {
    return this.userService.deleteUserEducationById(userId, educationId);
  }

  @Patch("/:userId/experience")
  addUserExperience(
    @Param("userId") userId: string,
    @Body() experience: Experience[]
  ): Promise<User> {
    return this.userService.addUserExperience(userId, experience);
  }

  @Post("/:userId/experience")
  createUserExperience(
    @Param("userId") userId: string,
    @Body(ValidationPipe) createExperienceDto: CreateExperienceDto
  ): Promise<Experience> {
    return this.userService.createUserExperience(userId, createExperienceDto);
  }

  @Get("/:userId/experience")
  getUserExperience(@Param("userId") userId: string): Promise<Experience[]> {
    return this.userService.getUserExperience(userId);
  }

  @Get("/:userId/experience/:experienceId")
  getUserExperienceById(
    @Param("userId") userId: string,
    @Param("experienceId") experienceId: string
  ): Promise<Experience> {
    return this.userService.getUserExperienceById(userId, experienceId);
  }

  @Patch("/:userId/experience/:experienceId")
  updateUserExperienceById(
    @Param("userId") userId: string,
    @Param("experienceId") experienceId: string,
    @Body(ValidationPipe) updateExperienceDto: UpdateExperienceDto
  ): Promise<Experience> {
    return this.userService.updateUserExperienceById(
      userId,
      experienceId,
      updateExperienceDto
    );
  }

  @Delete("/:userId/experience/:experienceId")
  deleteUserExpereienceById(
    @Param("userId") userId: string,
    @Param("experienceId") experienceId: string
  ): Promise<DeleteResult> {
    return this.userService.deleteUserExperienceById(
      userId,
      experienceId,
    );
  }

  @Patch("/:userId/interest")
  addUserInterests(
    @Param("userId") userId: string,
    @Body(ValidationPipe) interests: string[]
  ) {
    return this.userService.addUserInterests(userId, interests);
  }
}
