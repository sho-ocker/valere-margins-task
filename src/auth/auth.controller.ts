import { Controller, Post, Body, Request } from "@nestjs/common";
import { AuthService } from './auth.service';
import { RegisterUserDto } from "./dto/register-user.dto";
import { User } from "../users/users.entity";
import { LoginUserDto } from "./dto/login-user.dto";
import { Public } from "./public.decorator";
import { ApiOperation } from "@nestjs/swagger";

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({ summary: 'User login' })
  @Public()
  @Post('login')
  async login(@Body() loginUserDto: LoginUserDto) {
    return this.authService.login(loginUserDto);
  }

  @ApiOperation({ summary: 'User registration' })
  @Public()
  @Post('register')
  async register(@Body() registerUserDto: RegisterUserDto): Promise<User> {
    return this.authService.register(registerUserDto);
  }

  @ApiOperation({ summary: 'User logout' })
  @Post('logout')
  async logout(@Request() req: any) {
    const token = req.headers['authorization'].split(' ')[1];
    return this.authService.logout(token);
  }
}
