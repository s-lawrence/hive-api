import {
  Injectable,
  InternalServerErrorException,
} from "@nestjs/common";
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

  getProjects(): Promise<Project[]> {
    return this.projectRepository.find();
  }

  async createProject(
    userId: string,
    projectDto: ProjectDto,
    media
  ): Promise<Project> {
    try {
      return this.projectRepository.createProject(userId, projectDto, media.location);
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(
        "there was an error uploading you image"
      );
    }
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
    return this.projectRepository
      .createQueryBuilder("project")
      .delete()
      .where("id = :id", { id })
      .andWhere("owner.id = :userId", { userId })
      .execute();
  }
}
