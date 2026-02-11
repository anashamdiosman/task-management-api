import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

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
}
