import { Module } from '@nestjs/common';
import { ClassesController } from './classes.controller';
import { ClassesService } from './classes.service';
import { TypeOrmModule } from "@nestjs/typeorm";
import { Class } from "./classes.entity";
import { SportsModule } from "../sports/sports.module";
import { Sport } from "../sports/sports.entity";
import { UsersModule } from "../users/users.module";

@Module({
  imports: [
    TypeOrmModule.forFeature([Class, Sport]),
    SportsModule,
    UsersModule
  ],
  providers: [ClassesService],
  controllers: [ClassesController],
  exports: [ClassesService],
})
export class ClassesModule {}
