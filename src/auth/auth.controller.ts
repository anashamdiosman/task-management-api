import type { Response } from 'express';
import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { LoginDto, SignupDto, UserResponseDto } from './dto';
import { AuthService } from './auth.service';
import { ApiTags } from '@nestjs/swagger';
import { ApiStandardResponses } from 'src/shared/swagger/swagger-helpers';
import { AuthDto } from './dto/auth.dto';
import { User } from 'src/entities/users.entity';
import { GetUser } from './get-user.decorator';
import { plainToInstance } from 'class-transformer';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  // ---------------- SIGNUP ----------------
  @Post('/signup')
  @ApiStandardResponses(undefined, {
    summary: 'Create a new user',
    status: 201, // 201 Created
    actionType: 'create',
  })
  async signup(
    @Body() dto: SignupDto,
    @Res({ passthrough: true }) res: Response,
  ): Promise<void> {
    const user = await this.authService.createUser(dto);
    res.cookie('access_token', user.accessToken, {
      httpOnly: true,
      secure: process.env.STAGE === 'prod',
      sameSite: 'strict',
      path: '/',
      maxAge: 1000 * 60 * 60,
    });
  }

  // ---------------- LOGIN ----------------
  @Post('/login')
  @HttpCode(200)
  @ApiStandardResponses(AuthDto, {
    summary: 'Login',
    actionType: 'login',
  })
  async login(
    @Body() dto: LoginDto,
    @Res({ passthrough: true }) res: Response,
  ): Promise<void> {
    const user = await this.authService.login(dto);

    res.cookie('access_token', user.accessToken, {
      httpOnly: true,
      secure: process.env.STAGE === 'prod',
      sameSite: 'strict',
      path: '/',
      maxAge: 1000 * 60 * 60,
    });
  }

  @Get('/user')
  @HttpCode(200)
  @ApiStandardResponses(UserResponseDto, {
    summary: 'Get user details',
    actionType: 'read',
  })
  @UseGuards(AuthGuard('jwt')) // Apply authentication guard to all routes in this controller
  getUser(@GetUser() user: User): UserResponseDto {
    return plainToInstance(UserResponseDto, user, {
      excludeExtraneousValues: true,
    });
  }
}
