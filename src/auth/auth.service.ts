import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/users.entity';
import { LoginDto, SignupDto } from './dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { AuthResponseDto } from './dto/auth-response.dto';
import { JwtPayload } from './interface';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(password, salt);
    return hash;
  }

  async comparePasswords(
    plainPassword: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return await bcrypt.compare(plainPassword, hashedPassword);
  }

  generateJwtToken(payload: JwtPayload): string {
    return this.jwtService.sign(payload);
  }

  // ---------------- SIGNUP ----------------
  async createUser(userDto: SignupDto): Promise<AuthResponseDto> {
    const hashedPassword = await this.hashPassword(userDto.password);

    const user = this.usersRepository.create({
      ...userDto,
      password: hashedPassword,
    });

    try {
      const savedUser = await this.usersRepository.save(user);
      return {
        accessToken: this.generateJwtToken({ username: savedUser.username }),
      };
    } catch (e) {
      const error = e as { code: string };
      if (typeof error === 'object' && error !== null && 'code' in error) {
        if (error?.code === '23505') {
          throw new ConflictException('Username already exists');
        }
      }
      throw new InternalServerErrorException();
    }
  }

  // ---------------- LOGIN ----------------
  async login(loginDto: LoginDto): Promise<AuthResponseDto> {
    const { username, password } = loginDto;

    const user = await this.usersRepository.findOneBy({ username });
    if (!user) throw new NotFoundException('Invalid Credentials');
    const isPasswordValid = await this.comparePasswords(
      password,
      user.password,
    );
    if (!isPasswordValid) throw new NotFoundException('Invalid Credentials');
    return { accessToken: this.generateJwtToken({ username: user.username }) };
  }
}
