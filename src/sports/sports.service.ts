import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Sport } from './sports.entity';

@Injectable()
export class SportsService {
  constructor(
    @InjectRepository(Sport)
    private readonly sportRepository: Repository<Sport>,
  ) {}

  findAll(): Promise<Sport[]> {
    return this.sportRepository.find();
  }

  findOne(id: number): Promise<Sport> {
    return this.sportRepository.findOne({ where: { id } });
  }

  async create(sport: Partial<Sport>): Promise<Sport> {
    const existingSport = await this.sportRepository.findOne({ where: { name: sport.name } });

    if (existingSport) {
      throw new BadRequestException('Sport already exists');
    }

    const newSport = this.sportRepository.create(sport);
    return this.sportRepository.save(newSport);
  }

  async populateDefaultSports(): Promise<void> {
    const defaultSports = ['Football', 'Basketball', 'Handball', 'Golf'];

    for (const sport of defaultSports) {
      const newSport = this.sportRepository.create({
        name: sport,
      })
      await this.sportRepository.save(newSport);
    }
  }
}
