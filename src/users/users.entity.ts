import { Entity, Column, PrimaryGeneratedColumn, ManyToMany } from "typeorm";
import { Class } from "../clasess/classes.entity";

export enum UserRole {
  ADMIN = 'admin',
  USER = 'user',
}

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ type: 'enum', enum: UserRole, default: UserRole.USER })
  role: UserRole;

  @ManyToMany(() => Class, (sportClass) => sportClass.participants)
  classes: Class[];
}
