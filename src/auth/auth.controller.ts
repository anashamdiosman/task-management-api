import { Body, Controller, Post } from '@nestjs/common';
import { LoginDto, SignupDto } from './dto';
import { AuthService } from './auth.service';
import { ApiTags } from '@nestjs/swagger';
import { ApiStandardResponses } from 'src/shared/swagger/swagger-helpers';
import { plainToInstance } from 'class-transformer';
import { AuthResponseDto } from './dto/auth-response.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  // ---------------- SIGNUP ----------------
  @Post('/signup')
  @ApiStandardResponses(AuthResponseDto, {
    summary: 'Create a new user',
    status: 201, // 201 Created
    actionType: 'create',
  })
  async signup(@Body() dto: SignupDto): Promise<AuthResponseDto> {
    const user = await this.authService.createUser(dto);
    return plainToInstance(AuthResponseDto, user);
  }

  // ---------------- LOGIN ----------------
  @Post('/login')
  @ApiStandardResponses(AuthResponseDto, {
    summary: 'Login',
    actionType: 'login',
  })
  async login(@Body() dto: LoginDto): Promise<AuthResponseDto> {
    const user = await this.authService.login(dto);
    return plainToInstance(AuthResponseDto, user, {
      excludeExtraneousValues: true,
    });
  }
}
