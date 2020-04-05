import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  Unique,
  ManyToOne,
  JoinColumn,
  OneToOne,
  OneToMany,
  ManyToMany,
  JoinTable
} from "typeorm";
import * as bcrypt from "bcryptjs";
import { Account } from "../account/account.entity";
import { Interest } from "../interest/interest.entity";
import { Education } from "./education/education.entity";
import { Project } from "../project/project.entity";
import { Experience } from "./experience/experience.entity";

@Entity()
@Unique(["email"])
export class User extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @OneToOne(
    type => Account,
    account => account.user,
    { eager: false }
  )
  @JoinColumn()
  account: Account;

  @Column()
  accountId: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  fullName: string;

  @Column()
  email: string;

  @Column({ select: false })
  password: string;

  @Column({ select: false })
  salt: string;

  @ManyToMany(
    type => Interest,
    interest => interest.user,
    { nullable: true, cascade: true }
  )
  @JoinTable()
  interests: Interest[];

  @OneToMany(
    type => Education,
    education => education.user,
    { nullable: true, cascade: true }
  )
  @JoinColumn()
  education: Education[];

  @Column({ nullable: true })
  gender: string;

  @Column({ nullable: true })
  phoneNumber: string;

  @OneToMany(
    type => Project,
    project => project.owner,
    {nullable: true}
  )
  ownedProjects: Project[];

  @ManyToMany(type => Project, { nullable: true })
  @JoinTable()
  projects: Project[];

  @Column({ nullable: true })
  objective: string;

  @OneToMany(
    type => Experience,
    experience => experience.user,
    { nullable: true, cascade: true }
  )
  @JoinColumn()
  experience: Experience[];

  @Column({ nullable: true })
  awards: string;

  @Column({ nullable: true })
  avatarUrl: string;

  async validatePassword(password: string): Promise<boolean> {
    const hash = await bcrypt.hash(password, this.salt);
    return this.password === hash;
  }
}
