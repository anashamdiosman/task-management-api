import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  getAllTasks() {
    return this.tasksService.getAllTasks();
  }

  @Get(':id')
  getTaskById(@Param('id') id: string) {
    return this.tasksService.getTaskById(id);
  }

  @Post()
  createTask(@Body() dto: CreateTaskDto) {
    const { description, title } = dto;
    return this.tasksService.createTask({ description, title });
  }

  @Patch(':id')
  updateTaskById(@Body() updateDto: UpdateTaskDto, @Param('id') id: string) {
    const { title, description } = updateDto;
    return this.tasksService.updateTaskById(id, { title, description });
  }

  @Patch(':id/status')
  updateTaskStatusById(
    @Body() updateDto: UpdateTaskDto,
    @Param('id') id: string,
  ) {
    const { status } = updateDto;
    return this.tasksService.updateTaskById(id, { status });
  }

  @Delete(':id')
  deleteTaskById(@Param('id') id: string) {
    return this.tasksService.deleteTaskById(id);
  }
}
