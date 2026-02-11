import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';
import { User } from 'src/entities/users.entity';

export const GetUser = createParamDecorator(
  (_data, ctx: ExecutionContext): User | null => {
    const req: Request = ctx.switchToHttp().getRequest();
    if (!req.user) {
      throw new Error('req.user is undefined or null');
    }
    const user = req.user as User;
    return user;
  },
);
