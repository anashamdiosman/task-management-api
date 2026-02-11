import { IsEnum, IsNotEmpty, IsOptional } from 'class-validator';
import { TaskStatus } from 'src/enums/tasks-enums';
export class CreateTaskDto {
  @IsNotEmpty({ message: 'Title should not be empty' })
  title: string;

  @IsNotEmpty({ message: 'Description should not be empty' })
  description: string;
}

export class FilterTasksDto {
  @IsOptional()
  @IsEnum(TaskStatus, { message: 'Invalid status' })
  status?: TaskStatus;

  @IsOptional()
  @IsNotEmpty({ message: 'Search should not be empty' })
  search?: string;
}

export class UpdateTaskDto {
  @IsOptional()
  @IsNotEmpty({ message: 'Title should not be empty' })
  title?: string;
  @IsOptional()
  @IsNotEmpty({ message: 'Description should not be empty' })
  description?: string;
  @IsOptional()
  @IsEnum(TaskStatus, { message: 'Invalid status' })
  status?: TaskStatus;
}
