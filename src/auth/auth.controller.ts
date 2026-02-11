import { Body, Controller, Post } from '@nestjs/common';
import { LoginDto, SignupDto, UserResponseDto } from './dto';
import { AuthService } from './auth.service';
import { ApiTags } from '@nestjs/swagger';
import { ApiStandardResponses } from 'src/shared/swagger/swagger-helpers';

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
  signup(@Body() dto: SignupDto): Promise<UserResponseDto> {
    return this.authService.createUser(dto);
  }

  // ---------------- LOGIN ----------------
  @Post('/login')
  @ApiStandardResponses(UserResponseDto, {
    summary: 'Login',
  })
  login(@Body() dto: LoginDto): Promise<UserResponseDto> {
    return this.authService.login(dto);
  }
}
