import { Repository, EntityRepository, getRepository } from "typeorm";
import { Project } from "./project.entity";
import { ProjectDto } from "./dto/project.dto";
import { Interest } from "src/interest/interest.entity";
import { InterestRepository } from "src/interest/interest.repository";
import {
  InternalServerErrorException,
  UnauthorizedException
} from "@nestjs/common";
import { User } from "src/user/user.entity";
import { UpdateProjectDto } from "./dto/update-project-dto";

@EntityRepository(Project)
export class ProjectRepository extends Repository<Project> {
  async createProject(
    userId: string,
    projectDto: ProjectDto
  ): Promise<Project> {
    const { title, description, projectType, interests } = projectDto;

    const project = new Project();
    project.title = title;
    project.description = description;
    project.projectType = projectType;
    const user = await getRepository(User).findOne({ id: userId });
    project.user = user;
    for (let interest of interests) {
      const existing = await getRepository(Interest).findOne(interest);
      if (existing) {
        project.interests = project.interests
          ? [...project.interests, existing]
          : [existing];
      } else {
        const newInterest = new Interest();
        newInterest.name = interest.toLowerCase();
        project.interests = project.interests
          ? [...project.interests, newInterest]
          : [newInterest];
      }
    }
    try {
      project.save();
      return project;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(
        "This was an error creating project: " + error
      );
    }
  }

  async updateProjectById(
    id: string,
    userId: string,
    updateProjectDto: UpdateProjectDto
  ): Promise<Project> {
    return await this.findOne({ id, userId }).then(async project => {
      for (let [key, value] of Object.entries(updateProjectDto)) {
        if (key === "id") {
          throw new UnauthorizedException();
        }
        if (key === "completed" && (value === true || value === "true")) {
          project.completionDate = new Date();
        }
        if(key === "interests") {
          for (let interest of value) {
            const existing = await getRepository(Interest).findOne(interest);
            if (existing) {
              project.interests = project.interests
                ? [...project.interests, existing]
                : [existing];
            } else {
              const newInterest = new Interest();
              newInterest.name = interest.toLowerCase();
              project.interests = project.interests
                ? [...project.interests, newInterest]
                : [newInterest];
            }
          }
        } else {
          project[key] = value;
        }
      }
      try {
        await project.save();
      } catch (error) {
        console.log(error);
        throw new InternalServerErrorException(
          "An error occured while updating project"
        );
      }
      return project;
    });
  }
}
