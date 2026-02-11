import { Body, Controller, Post } from '@nestjs/common';
import { LoginDto, SignupDto } from './dto';
import { User } from 'src/entities/users.entity';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  signup(@Body() dto: SignupDto): Promise<User> {
    return this.authService.createUser(dto);
  }

  @Post('/login')
  login(@Body() dto: LoginDto): Promise<User> {
    return this.authService.login(dto);
  }
}
