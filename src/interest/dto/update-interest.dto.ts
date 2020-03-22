import { User } from "src/user/user.entity";
import { Project } from "src/project/project.entity";
import { ApiProperty } from "@nestjs/swagger";

export class UpdateInterestDto {

  @ApiProperty()
  user: User;

  @ApiProperty()
  projects: Project[];
}