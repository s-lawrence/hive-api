import { Entity, BaseEntity, Column, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn, JoinTable, JoinColumn } from "typeorm";
import { User } from "../user.entity";


@Entity()
export class Experience extends BaseEntity {

  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ManyToOne(
    type => User,
    user => user.experience
  )
  user: User;

  @Column()
  userId: string;

  @Column()
  jobTitle: string;

  @Column()
  companyName: string;

  @Column()
  startDate: Date;

  @Column()
  endDate: Date;

  @Column()
  description: string;
}