import { User } from "src/user/user.entity";
import { Project } from "src/project/project.entity";

export class UpdateInterestDto {

  user: User;

  projects: Project[];
}