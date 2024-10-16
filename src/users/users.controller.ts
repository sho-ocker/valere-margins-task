import { Controller, Get, Param, UseGuards } from "@nestjs/common";
import { UsersService } from "./users.service";
import { RolesGuard } from "../auth/roles.guard";
import { Roles } from "../auth/roles.decorator";
import { UserRole } from "./users.entity";
import { ApiOperation } from "@nestjs/swagger";

@UseGuards(RolesGuard)
@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {
  }

  @ApiOperation({ summary: 'Retrieve all users' })
  @Roles(UserRole.ADMIN)
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @ApiOperation({ summary: 'Retrieve specific user' })
  @Roles(UserRole.ADMIN)
  @Get(":id")
  findOne(@Param("id") id: number) {
    return this.usersService.findOne(id);
  }
}

