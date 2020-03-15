import { Injectable } from "@nestjs/common";
import { ProjectDto } from "./dto/project.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { ProjectRepository } from "./project.repository";
import { Project } from "./project.entity";
import { UpdateProjectDto } from "./dto/update-project-dto";
import { DeleteResult } from "typeorm";

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(ProjectRepository)
    private projectRepository: ProjectRepository
  ) {}

  createProject(userId: string, projectDto: ProjectDto): Promise<Project> {
    return this.projectRepository.createProject(userId, projectDto);
  }

  async getProjectById(id: string): Promise<Project> {
    return await this.projectRepository
      .createQueryBuilder("project")
      .leftJoinAndSelect("project.interests", "interest")
      .where("project.id = :id", { id })
      .getOne();
  }

  updateProjectById(
    id: string,
    userId: string,
    updateProjectDto: UpdateProjectDto
  ): Promise<Project> {
    return this.projectRepository.updateProjectById(
      id,
      userId,
      updateProjectDto
    );
  }

  deleteProjectById(id: string, userId: string): Promise<DeleteResult> {
    return this.projectRepository.delete({ id, userId });
  }
}
