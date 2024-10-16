import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  ManyToMany,
  JoinTable,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Sport } from "../sports/sports.entity";
import { User } from "../users/users.entity";
import { Max, Min } from "class-validator";

@Entity()
export class Class {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Sport, (sport) => sport.classes, { eager: false })
  sport: Sport;

  @ManyToMany(() => User, (user) => user.classes)
  @JoinTable()
  participants: User[];

  @Column({ type: 'date' })
  date: string;

  @Column({ type: 'time' })
  time: string;

  @Column()
  description: string;

  @Column({ type: 'int', default: 120 })
  duration: number;

  @Column({ default: 3 })
  @Min(1)
  @Max(7)
  frequencyPerWeek: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
