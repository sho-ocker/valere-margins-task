import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { Class } from '../clasess/classes.entity';

@Entity()
export class Sport {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => Class, (classEntity) => classEntity.sport)
  classes: Class[];
}
