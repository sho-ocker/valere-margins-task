import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { In, Repository } from "typeorm";
import { Class } from "./classes.entity";
import { Sport } from "../sports/sports.entity";
import { UsersService } from "../users/users.service";
import { CreateClassDto } from "./dto/create-class.dto";

@Injectable()
export class ClassesService {
  constructor(
    @InjectRepository(Class)
    private classRepository: Repository<Class>,
    @InjectRepository(Sport)
    private sportRepository: Repository<Sport>,
    private readonly usersService: UsersService,
  ) {}

  private async getSportClassAndUser(classId: number, userId: number): Promise<{ sportClass: Class, user: any }> {
    const sportClass = await this.classRepository.findOne({
      where: { id: classId },
      relations: ['participants'],
    });

    const user = await this.usersService.findOne(userId);

    if (!sportClass) {
      throw new NotFoundException(`Class with ID ${classId} not found`);
    }

    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    return { sportClass, user };
  }

  private isUserAlreadyEnrolled(sportClass: Class, userId: number): boolean {
    return sportClass.participants.some((u) => u.id === userId);
  }

  async applyForClass(classId: number, userId: number): Promise<string> {
    const { sportClass, user } = await this.getSportClassAndUser(classId, userId);

    if (this.isUserAlreadyEnrolled(sportClass, userId)) {
      throw new BadRequestException(`User with ID ${userId} is already enrolled in this class`);
    }

    sportClass.participants.push(user);
    await this.classRepository.save(sportClass);

    return `User with ID ${userId} has successfully applied to the class with ID ${classId}`;
  }

  async removeClass(classId: number, userId: number): Promise<string> {
    const { sportClass } = await this.getSportClassAndUser(classId, userId);

    if (!this.isUserAlreadyEnrolled(sportClass, userId)) {
      throw new BadRequestException(`User with ID ${userId} is not enrolled in this class`);
    }

    sportClass.participants = sportClass.participants.filter((userInClass) => userInClass.id !== userId);
    await this.classRepository.save(sportClass);

    return `User with ID ${userId} has successfully been removed from the class with ID ${classId}`;
  }

  async findAll(sports?: string[]): Promise<Class[]> {
    const findOptions: any = {};

    if (sports) {
      const sportEntities = await this.sportRepository.find({
        where: { name: In(sports) }
      });

      const sportIds = sportEntities.map(sport => sport.id);
      findOptions.sport = { id: In(sportIds) };
    }

    return this.classRepository.find({
      where: findOptions,
      relations: ['sport'],
    });
  }

  async findOneWithDetails(id: string): Promise<Class> {
    const classEntity = await this.classRepository.findOne({
      where: { id: parseInt(id) },
      relations: ['sport'],
    });

    if (!classEntity) {
      throw new NotFoundException(`Class with ID ${id} not found`);
    }

    return classEntity;
  }

  async create(createClassDto: CreateClassDto): Promise<Class> {
    const { sportId, date, time, description, frequencyPerWeek, duration} = createClassDto;

    const sport = await this.sportRepository.findOne({ where: { id: sportId } });

    if (!sport) {
      throw new NotFoundException(`Sport with ID ${sportId} not found`);
    }

    const newClass = this.classRepository.create({
      sport,
      date,
      time,
      description,
      frequencyPerWeek,
      duration
    });

    return this.classRepository.save(newClass);
  }

  async update(id: string, classData: Partial<Class>): Promise<Class> {
    const existingClass = await this.classRepository.findOne({ where: { id: parseInt(id) } });

    if (!existingClass) {
      throw new NotFoundException(`Class with ID ${id} not found`);
    }

    await this.classRepository.update(id, classData);
    return this.classRepository.findOne({ where: { id: parseInt(id) } });
  }

  async delete(id: string): Promise<void> {
    const existingClass = await this.classRepository.findOne({ where: { id: parseInt(id) } });

    if (!existingClass) {
      throw new NotFoundException(`Class with ID ${id} not found`);
    }

    await this.classRepository.delete(id);
  }

  async populateDefaultClasses(): Promise<void> {
    const sports = await this.sportRepository.find();
    const defaultDays = ['Monday', 'Wednesday', 'Friday'];

    if (!sports.length) {
      console.log('No sports available to populate classes.');
      return;
    }

    for (const sport of sports) {
      for (const day of defaultDays) {
        const classDate = this.getNextDateForDay(day);

        const newClass = this.classRepository.create({
          sport,
          date: classDate,
          time: '12:00',
          description: `${sport.name} class on ${day}`,
          duration: 120,
          frequencyPerWeek: 3,
        });

        await this.classRepository.save(newClass);
      }
    }
  }

  private getNextDateForDay(day: string): string {
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const today = new Date();
    const targetDayIndex = daysOfWeek.indexOf(day);

    let nextDate = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    nextDate.setDate(today.getDate() + (targetDayIndex + 7 - today.getDay()) % 7);

    return nextDate.toISOString().split('T')[0];
  }

}
