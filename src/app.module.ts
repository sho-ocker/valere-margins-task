import { Module, OnModuleInit } from "@nestjs/common";
import { InjectRepository, TypeOrmModule } from "@nestjs/typeorm";
import { User } from './users/users.entity';
import { Class } from './clasess/classes.entity';
import { UsersModule } from './users/users.module';
import { ClassesModule } from './clasess/classes.module';
import { SportsModule } from './sports/sports.module';
import { Sport } from "./sports/sports.entity";
import { AuthModule } from "./auth/auth.module";
import { ConfigModule } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { SportsService } from "./sports/sports.service";
import { ClassesService } from "./clasess/classes.service";
import { Repository } from "typeorm";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [User, Class, Sport],
      synchronize: true,
    }),
    AuthModule,
    UsersModule,
    ClassesModule,
    SportsModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '60m' },
    }),
    TypeOrmModule.forFeature([Sport, Class])
  ],
  providers: [
    SportsService,
    ClassesService
  ],
})
export class AppModule implements OnModuleInit {
  constructor(
    private readonly sportsService: SportsService,
    private readonly classesService: ClassesService,
    @InjectRepository(Sport)
    private readonly sportRepository: Repository<Sport>,
    @InjectRepository(Class)
    private readonly classRepository: Repository<Class>
  ) {}

  async onModuleInit() {
    const sportCount = await this.sportRepository.count();
    const classCount = await this.classRepository.count();

    if (sportCount === 0) {
      await this.sportsService.populateDefaultSports();
    }

    if (classCount === 0) {
      await this.classesService.populateDefaultClasses();
    }
  }
}
