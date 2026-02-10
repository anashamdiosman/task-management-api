import { IsEnum, IsNotEmpty, IsOptional } from 'class-validator';
import { TaskStatus } from 'src/enums/tasks-enums';
export class CreateTaskDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  description: string;
}

export class FilterTasksDto {
  @IsOptional()
  @IsEnum(TaskStatus)
  status?: TaskStatus;

  @IsOptional()
  @IsNotEmpty()
  search?: string;
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
