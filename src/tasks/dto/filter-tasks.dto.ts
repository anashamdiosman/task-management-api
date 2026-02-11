import { ApiPropertyOptional } from '@nestjs/swagger';
import { TaskStatus } from '../enums/tasks-status.enum';
import { IsEnum, IsNotEmpty, IsOptional } from 'class-validator';

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
