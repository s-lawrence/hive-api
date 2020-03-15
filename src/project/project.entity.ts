import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  ManyToMany,
  JoinTable,
  Column,
  CreateDateColumn
} from "typeorm";
import { User } from "../user/user.entity";
import { Interest } from "../interest/interest.entity";

@Entity()
export class Project extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ManyToOne(
    type => User,
    user => user.projects
  )
  @JoinColumn()
  user: User;
  @Column()
  userId: string;

  @ManyToMany(type => User, { cascade: true })
  users: User[];

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  projectType: string;

  @CreateDateColumn()
  creationDate: Date;

  @Column({ nullable: true })
  completionDate: Date;

  @Column({ nullable: true })
  mediaUrl: string;

  @Column({ nullable: true })
  completed: boolean;

  @ManyToMany(type => Interest, { cascade: true })
  @JoinTable()
  interests: Interest[];
}
