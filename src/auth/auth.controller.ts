import { Body, Controller, Post } from '@nestjs/common';
import { LoginDto, SignupDto, UserResponseDto } from './dto';
import { AuthService } from './auth.service';
import { ApiTags } from '@nestjs/swagger';
import { ApiStandardResponses } from 'src/shared/swagger/swagger-helpers';
import { plainToInstance } from 'class-transformer';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  // ---------------- SIGNUP ----------------
  @Post('/signup')
  @ApiStandardResponses(UserResponseDto, {
    summary: 'Create a new user',
    status: 201, // 201 Created
  })
  async signup(@Body() dto: SignupDto): Promise<UserResponseDto> {
    const user = await this.authService.createUser(dto);
    return plainToInstance(UserResponseDto, user);
  }

  // ---------------- LOGIN ----------------
  @Post('/login')
  @ApiStandardResponses(UserResponseDto, {
    summary: 'Login',
  })
  async login(@Body() dto: LoginDto): Promise<UserResponseDto> {
    const user = await this.authService.login(dto);
    return plainToInstance(UserResponseDto, user, {
      excludeExtraneousValues: true,
    });
  }
}
