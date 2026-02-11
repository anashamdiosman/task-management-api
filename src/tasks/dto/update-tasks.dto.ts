import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsOptional } from 'class-validator';
import { TaskStatus } from '../enums/tasks-status.enum';

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
