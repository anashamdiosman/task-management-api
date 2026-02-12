import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { UserResponseDto } from 'src/auth/dto';

export class TaskResponseDto {
  @ApiProperty()
  @Expose()
  id: string;

  @ApiProperty()
  @Expose()
  title: string;

  @ApiProperty()
  @Expose()
  description: string;

  @ApiProperty()
  @Expose()
  status: string;

  @ApiProperty({ type: () => UserResponseDto, required: false })
  @Expose()
  @Type(() => UserResponseDto)
  user?: UserResponseDto;
}
