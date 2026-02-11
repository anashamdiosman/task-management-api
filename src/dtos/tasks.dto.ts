import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { TaskStatus } from 'src/enums/tasks-enums';

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

export class FilterTasksDto {
  @ApiPropertyOptional({
    description: 'Filter tasks by status',
    enum: TaskStatus,
    example: TaskStatus.OPEN,
  })
  @IsOptional()
  @IsEnum(TaskStatus, { message: 'Invalid status' })
  status?: TaskStatus;

  @ApiPropertyOptional({
    example: 'documentation',
    description: 'Search by title or description',
  })
  @IsOptional()
  @IsNotEmpty({ message: 'Search should not be empty' })
  search?: string;
}

export class UpdateTaskDto {
  @ApiPropertyOptional({
    example: 'Updated task title',
    description: 'New title of the task',
  })
  @IsOptional()
  @IsNotEmpty({ message: 'Title should not be empty' })
  title?: string;

  @ApiPropertyOptional({
    example: 'Updated task description',
    description: 'New description of the task',
  })
  @IsOptional()
  @IsNotEmpty({ message: 'Description should not be empty' })
  description?: string;

  @ApiPropertyOptional({
    enum: TaskStatus,
    example: TaskStatus.IN_PROGRESS,
    description: 'Updated status of the task',
  })
  @IsOptional()
  @IsEnum(TaskStatus, { message: 'Invalid status' })
  status?: TaskStatus;
}
