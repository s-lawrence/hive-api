import {
  Controller,
  Post,
  Body,
  ValidationPipe,
  UseGuards,
  Param,
  Get,
  Patch,
  Delete
} from "@nestjs/common";
import { ProjectDto } from "./dto/project.dto";
import { AuthGuard } from "@nestjs/passport";
import { ProjectService } from "./project.service";
import { Project } from "./project.entity";
import { UpdateProjectDto } from "./dto/update-project-dto";
import { DeleteResult } from "typeorm";
import { ApiTags, ApiBearerAuth } from "@nestjs/swagger";

@ApiBearerAuth()
@ApiTags('Project')
@UseGuards(AuthGuard())
@Controller("project")
export class ProjectController {
  constructor(private projectService: ProjectService) {}

  @Post("/create/:userId")
  createProject(
    @Param("userId") userId: string,
    @Body(ValidationPipe) projectDto: ProjectDto
  ): Promise<Project> {
    return this.projectService.createProject(userId, projectDto);
  }

  @Get("/:id")
  getProjectById(@Param("id") id: string): Promise<Project> {
    return this.projectService.getProjectById(id);
  }

  @Patch("/:id/user/:userId")
  updateProjectById(
    @Param("id") id: string,
    @Param("userId") userId: string,
    @Body(ValidationPipe) updateProjectDto: UpdateProjectDto
  ): Promise<Project> {
    return this.projectService.updateProjectById(id, userId, updateProjectDto);
  }

  @Delete("/:id/user/:userId")
  deleteProjectById(
    @Param("id") id: string,
    @Param("userId") userId: string
  ): Promise<DeleteResult> {
    return this.projectService.deleteProjectById(id, userId);
  }
}
