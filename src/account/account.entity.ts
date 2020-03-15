import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn
} from "typeorm";
import { User } from "../user/user.entity";

@Entity()
export class Account extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;

  @Column()
  isFirstTime: boolean;

  @Column()
  enabled: boolean;

  @OneToOne(
    type => User,
    user => user.account,
    { eager: true, cascade: true, onDelete: "CASCADE" }
  )
  user: User;
}
