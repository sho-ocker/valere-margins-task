import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/login-user.dto';
import { RegisterUserDto } from './dto/register-user.dto';
import { UserRole } from "../users/users.entity";

describe('AuthController', () => {
  let authController: AuthController;
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: {
            login: jest.fn(),
            register: jest.fn(),
            logout: jest.fn(),
          },
        },
      ],
    }).compile();

    authController = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });

  describe('login', () => {
    it('should return a token on successful login', async () => {
      const loginDto: LoginUserDto = { email: 'test@example.com', password: 'password' };
      const result = { jwt_token: 'token123' };

      jest.spyOn(authService, 'login').mockResolvedValue(result);

      expect(await authController.login(loginDto)).toEqual(result);
    });
  });

  describe('register', () => {
    it('should register a new user', async () => {
      const registerDto: RegisterUserDto = { email: 'test@example.com', password: 'password' };
      const user = { id: 1, role: UserRole.USER, classes: [], ...registerDto };

      jest.spyOn(authService, 'register').mockResolvedValue(user);

      expect(await authController.register(registerDto)).toEqual(user);
    });
  });
});
