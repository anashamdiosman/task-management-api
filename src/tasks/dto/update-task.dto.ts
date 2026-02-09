import { IsEnum, IsNotEmpty, IsOptional } from 'class-validator';
import { TaskStatus } from '../tasks-enums';

export class UpdateTaskStatusDto {
  @IsEnum(TaskStatus)
  status: TaskStatus;
}

export class UpdateTaskDto {
  @IsOptional()
  @IsNotEmpty()
  title?: string;
  @IsOptional()
  @IsNotEmpty()
  description?: string;
  @IsOptional()
  @IsEnum(TaskStatus)
  status?: TaskStatus;
}
