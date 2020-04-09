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

/**
 * Interest Entity class, outlines the attributes and relationships
 * for the Interest table in the database.
 */
@Entity()
export class Interest extends BaseEntity {
  
  /**
   * Primary Key
   */
  @PrimaryColumn()
  name: string;

  /**
   * Uses association class, Users_Interests for separation.
   * Nullable is allowed.
   */
  @ManyToMany(
    type => User,
    user => user.interests,
    { nullable: true }
  )
  user: User;

    /**
   * Uses association class, Projects_Interests for separation.
   * Nullable is allowed.
   */
  @ManyToMany(type => Project, { nullable: true })
  projects: Project[];
}
