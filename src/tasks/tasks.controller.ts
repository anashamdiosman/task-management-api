import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import {
  CreateTaskDto,
  FilterTasksDto,
  UpdateTaskDto,
} from '../dtos/tasks.dto';
import { Task } from 'src/entities/tasks.entity';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  getAllTasks(@Query() filterDto: FilterTasksDto): Promise<Task[]> {
    const { status, search } = filterDto;
    return this.tasksService.getAllTasks({ status, search });
  }

  @Get(':id')
  getTaskById(@Param('id') id: string): Promise<Task> {
    return this.tasksService.getTaskById(id);
  }

  @Post()
  createTask(@Body() dto: CreateTaskDto): Promise<Task> {
    const { description, title } = dto;
    return this.tasksService.createTask({ description, title });
  }

  @Patch(':id')
  updateTaskById(
    @Body() updateDto: UpdateTaskDto,
    @Param('id') id: string,
  ): Promise<Task> {
    const { title, description } = updateDto;
    return this.tasksService.updateTaskById(id, { title, description });
  }

  @Patch(':id/status')
  updateTaskStatusById(
    @Body() updateDto: UpdateTaskDto,
    @Param('id') id: string,
  ): Promise<Task> {
    const { status } = updateDto;
    return this.tasksService.updateTaskById(id, { status });
  }

  @Delete(':id')
  deleteTaskById(@Param('id') id: string) {
    return this.tasksService.deleteTaskById(id);
  }
}
