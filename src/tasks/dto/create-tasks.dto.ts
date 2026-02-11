import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateTaskDto {
  @ApiProperty({
    example: 'Build API documentation',
    description: 'Title of the task',
  })
  @IsString()
  @IsNotEmpty({ message: 'Title should not be empty' })
  title: string;

  @ApiProperty({
    example: 'Document Swagger integration in NestJS',
    description: 'Detailed description of the task',
  })
  @IsString()
  @IsNotEmpty({ message: 'Description should not be empty' })
  description: string;
}
