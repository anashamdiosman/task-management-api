import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/users.entity';
import { Repository } from 'typeorm';
import { LoginDto, SignupDto } from 'src/dtos/auth.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  async createUser(userDto: SignupDto): Promise<User> {
    const user = this.usersRepository.create(userDto);
    return await this.usersRepository.save(user);
  }

  async login(loginDto: LoginDto): Promise<User> {
    const { username, password } = loginDto;
    const user = await this.usersRepository.findOneBy({ username, password });
    if (!user) throw new NotFoundException('User not found');
    return user;
  }
}
