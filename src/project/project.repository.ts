import { Repository, EntityRepository, getRepository } from "typeorm";
import { Project } from "./project.entity";
import { ProjectDto } from "./dto/project.dto";
import { Interest } from "src/interest/interest.entity";
import {
  InternalServerErrorException,
  UnauthorizedException,
} from "@nestjs/common";
import { User } from "src/user/user.entity";
import { UpdateProjectDto } from "./dto/update-project-dto";

@EntityRepository(Project)
export class ProjectRepository extends Repository<Project> {
  async createProject(
    userId: string,
    projectDto: ProjectDto,
    mediaUrl: string
  ): Promise<Project> {
    const { title, description, projectType, interestsString } = projectDto;
    const project = new Project();
    project.title = title;
    project.description = description;
    project.projectType = projectType;
    project.mediaUrl = mediaUrl;
    let interests = interestsString.split("#");
    const owner = await getRepository(User).findOne({ id: userId });
    project.owner = owner;
    for (let interest of interests) {
      interest = interest.trim().toLowerCase();
      if (interest !== "") {
        const existing = await getRepository(Interest).findOne(interest);
        if (existing) {
          const addToProject = project.interests
            ? project.interests.filter((int) => int.name === interest)
                .length === 0
            : true;
          if (addToProject) {
            project.interests = project.interests
              ? [...project.interests, existing]
              : [existing];
          }
        } else {
          const newInterest = new Interest();
          newInterest.name = interest;
          project.interests = project.interests
            ? [...project.interests, newInterest]
            : [newInterest];
        }
      }
    }
    try {
      return await project.save();
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
    return await this.createQueryBuilder("project")
      .where("project.id = :id", { id })
      .leftJoinAndSelect("project.owner", "user")
      .getOne()
      .then(async (project) => {
        if(project.owner.id !== userId) {
          throw new UnauthorizedException();
        }
        for (let [key, value] of Object.entries(updateProjectDto)) {
          if (key === "id") {
            throw new UnauthorizedException();
          }
          if (key === "completed" && (value === true || value === "true")) {
            project.completionDate = new Date();
          }
          if (key === "interestsString") {
            let interests = value.split("#");
            for (let interest of interests) {
              interest = interest.trim().toLowerCase();
              if (interest !== "") {
                const existing = await getRepository(Interest).findOne(
                  interest
                );
                if (existing) {
                  project.interests = project.interests
                    ? [...project.interests, existing]
                    : [existing];
                } else {
                  const newInterest = new Interest();
                  newInterest.name = interest;
                  project.interests = project.interests
                    ? [...project.interests, newInterest]
                    : [newInterest];
                }
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
