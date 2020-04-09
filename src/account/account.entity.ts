import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  CreateDateColumn,
  UpdateDateColumn
} from "typeorm";
import { User } from "../user/user.entity";

/**
 * Account Entity class, outlines the attributes and relationships,
 * for the Account table in the database.
 */
@Entity()
export class Account extends BaseEntity {
  
  /**
   * Primary key
   */
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;

  /**
   * Used to track account onboarding, indicates first
   * time an account logs in. Updates ones account has 
   * completed onboarding.
   */
  @Column()
  isFirstTime: boolean;

  /**
   * Tracks account status.
   */
  @Column()
  enabled: boolean;

  /**
   * One to one relationship with User. Cascades updates down
   * to User, and deletes User upon deletion. This is a compostion 
   * association between account and User. Account owns user.
   */
  @OneToOne(
    type => User,
    user => user.account,
    { eager: true, cascade: true, onDelete: "CASCADE" }
  )
  user: User;
}
