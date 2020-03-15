import {
  Entity,
  BaseEntity,
  ManyToOne,
  Column,
  ManyToMany,
  PrimaryColumn
} from "typeorm";
import { User } from "../user/user.entity";
import { Project } from "../project/project.entity";

@Entity()
export class Interest extends BaseEntity {
  
  @PrimaryColumn()
  name: string;

  @ManyToMany(
    type => User,
    user => user.interests,
    { nullable: true }
  )
  user: User;

  @ManyToMany(type => Project, { nullable: true })
  projects: Project[];
}
