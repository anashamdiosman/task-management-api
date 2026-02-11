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
import { CreateTaskDto, FilterTasksDto, UpdateTaskDto } from './dto';
import { Task } from 'src/entities/tasks.entity';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('tasks')
@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  @ApiOperation({ summary: 'Get all tasks' })
  getAllTasks(@Query() filterDto: FilterTasksDto): Promise<Task[]> {
    const { status, search } = filterDto;
    return this.tasksService.getAllTasks({ status, search });
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get Task by id' })
  getTaskById(@Param('id') id: string): Promise<Task> {
    return this.tasksService.getTaskById(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new task' })
  createTask(@Body() dto: CreateTaskDto): Promise<Task> {
    const { description, title } = dto;
    return this.tasksService.createTask({ description, title });
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a task' })
  updateTaskById(
    @Body() updateDto: UpdateTaskDto,
    @Param('id') id: string,
  ): Promise<Task> {
    const { title, description } = updateDto;
    return this.tasksService.updateTaskById(id, { title, description });
  }

  @Patch(':id/status')
  @ApiOperation({ summary: "Update a task's status" })
  updateTaskStatusById(
    @Body() updateDto: UpdateTaskDto,
    @Param('id') id: string,
  ): Promise<Task> {
    const { status } = updateDto;
    return this.tasksService.updateTaskById(id, { status });
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a task' })
  deleteTaskById(@Param('id') id: string) {
    return this.tasksService.deleteTaskById(id);
  }
}
