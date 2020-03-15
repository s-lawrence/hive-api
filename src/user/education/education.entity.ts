import {
  Entity,
  BaseEntity,
  ManyToOne,
  Column,
  PrimaryGeneratedColumn
} from "typeorm";
import { User } from "../user.entity";

@Entity()
export class Education extends BaseEntity {
  
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ManyToOne(
    type => User,
    user => user.education
  )
  user: User;
  
  @Column()
  userId: string;

  @Column()
  school: string;

  @Column()
  degree: string;

  @Column()
  startDate: Date;

  @Column()
  endDate: Date;

  @Column()
  fieldOfStudy: string;

  @Column()
  grade: string;

  @Column()
  description: string;
}
