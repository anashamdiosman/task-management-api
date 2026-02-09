import { IsEnum } from 'class-validator';
import { TaskStatus } from '../tasks-enums';

export class UpdateTaskStatusDto {
  @IsEnum(TaskStatus)
  status: TaskStatus;
}
