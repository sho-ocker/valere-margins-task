import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ClassesService } from './classes.service';
import { Class } from './classes.entity';
import { RolesGuard } from '../auth/roles.guard';
import { UserClassDto } from './dto/user-class.dto';
import { Roles } from '../auth/roles.decorator';
import { UserRole } from '../users/users.entity';
import { CreateClassDto } from './dto/create-class.dto';
import { ApiOperation } from '@nestjs/swagger';

@UseGuards(RolesGuard)
@Controller('classes')
export class ClassesController {
  constructor(private readonly classService: ClassesService) {}

  @ApiOperation({ summary: 'Populate default classes (admin only) - Automatically called on startup' })
  @Roles(UserRole.ADMIN)
  @Post('populate')
  async populateClasses() {
    await this.classService.populateDefaultClasses();
    return { message: 'Classes populated' };
  }

  @ApiOperation({ summary: 'Apply a user to a class' })
  @Post('apply')
  applyForClass(@Body() applyClassDto: UserClassDto) {
    return this.classService.applyForClass(
      applyClassDto.classId,
      applyClassDto.userId,
    );
  }

  @ApiOperation({ summary: 'Remove a user from a class' })
  @Delete('remove')
  removeClass(@Body() removeClassDto: UserClassDto) {
    return this.classService.removeClass(
      removeClassDto.classId,
      removeClassDto.userId,
    );
  }

  @ApiOperation({ summary: 'Retrieve all classes, optionally filtered by sports' })
  @Get()
  findAll(@Query('sports') sports?: string) {
    const sportsArray = sports ? sports.split(',') : null;
    return this.classService.findAll(sportsArray);
  }

  @ApiOperation({ summary: 'Retrieve a class by ID with details' })
  @Get(':id')
  findOne(@Param('id') id: string): Promise<Class> {
    return this.classService.findOneWithDetails(id);
  }

  @ApiOperation({ summary: 'Create a new class (admin only)' })
  @Roles(UserRole.ADMIN)
  @Post()
  create(@Body() createClassDto: CreateClassDto) {
    return this.classService.create(createClassDto);
  }

  @ApiOperation({ summary: 'Update an existing class (admin only)' })
  @Roles(UserRole.ADMIN)
  @Put(':id')
  update(@Param('id') id: string, @Body() body: Partial<Class>) {
    return this.classService.update(id, body);
  }

  @ApiOperation({ summary: 'Delete a class (admin only)' })
  @Roles(UserRole.ADMIN)
  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.classService.delete(id);
  }
}
