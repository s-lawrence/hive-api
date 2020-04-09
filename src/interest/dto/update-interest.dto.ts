import { User } from "src/user/user.entity";
import { Project } from "src/project/project.entity";
import { ApiProperty } from "@nestjs/swagger";

/**
 * Data transfer object for updating an Interest, 
 * validates and restricts data sent to server.
 * 
 * @property name
 * @property projects
 */
export class UpdateInterestDto {

  @ApiProperty()
  user: User;

  @ApiProperty()
  projects: Project[];
}