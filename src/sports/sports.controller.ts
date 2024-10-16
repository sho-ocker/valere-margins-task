import { Controller, Get, Post, Body, Param, UseGuards } from "@nestjs/common";
import { SportsService } from './sports.service';
import { Sport } from './sports.entity';
import { RolesGuard } from "../auth/roles.guard";
import { Roles } from "../auth/roles.decorator";
import { UserRole } from "../users/users.entity";
import { ApiOperation } from "@nestjs/swagger";

@UseGuards(RolesGuard)
@Controller('sports')
export class SportsController {
  constructor(private readonly sportService: SportsService) {}

  @ApiOperation({ summary: 'Populate default sports (admin only) - Automatically called on startup' })
  @Roles(UserRole.ADMIN)
  @Post('populate')
  async populateClasses() {
    await this.sportService.populateDefaultSports();
    return { message: 'Sports populated' };
  }

  @ApiOperation({ summary: 'Retrieve all sports' })
  @Get()
  findAll(): Promise<Sport[]> {
    return this.sportService.findAll();
  }

  @ApiOperation({ summary: 'Retrieve a sport by ID' })
  @Get(':id')
  findOne(@Param('id') id: number): Promise<Sport> {
    return this.sportService.findOne(id);
  }

  @ApiOperation({ summary: 'Create a new sport (admin only)' })
  @Roles(UserRole.ADMIN)
  @Post()
  create(@Body() sport: Partial<Sport>): Promise<Sport> {
    return this.sportService.create(sport);
  }
}
