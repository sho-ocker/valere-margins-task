import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { SportsService } from "./sports.service";
import { SportsController } from "./sports.controller";
import { Sport } from "./sports.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Sport])],
  providers: [SportsService],
  controllers: [SportsController],
  exports: [SportsService, TypeOrmModule],
})
export class SportsModule {}
