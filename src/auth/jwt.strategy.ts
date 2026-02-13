import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { User } from 'src/entities/users.entity';
import { Repository } from 'typeorm';
import { JwtPayload } from './interface';
import { Request } from 'express';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    private configService: ConfigService,
  ) {
    super({
      secretOrKey: configService.get<string>('JWT_SECRET')!,
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req: Request | undefined): string | null => {
          if (!req) return null;

          const cookies = req.cookies as Record<string, string> | undefined;

          if (!cookies) return null;

          return cookies['access_token'] ?? null;
        },
      ]),
    });
  }

  async validate(payload: JwtPayload) {
    const user = await this.usersRepository.findOneBy({
      username: payload.username,
    });

    if (!user) {
      throw new UnauthorizedException('Invalid token');
    }

    return user;
  }
}
