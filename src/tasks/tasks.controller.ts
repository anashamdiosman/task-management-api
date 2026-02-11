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
  TaskResponseDto,
} from './dto';
import { ApiTags } from '@nestjs/swagger';
import { ApiStandardResponses } from 'src/shared/swagger/swagger-helpers';

@ApiTags('Tasks')
@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  // ---------------- GET ALL TASKS ----------------
  @Get()
  @ApiStandardResponses(TaskResponseDto, {
    summary: 'Get all tasks',
    isArray: true,
    queryDto: FilterTasksDto,
  })
  getAllTasks(@Query() filterDto: FilterTasksDto): Promise<TaskResponseDto[]> {
    const { status, search } = filterDto;
    return this.tasksService.getAllTasks({ status, search });
  }

  // ---------------- GET TASK BY ID ----------------
  @Get(':id')
  @ApiStandardResponses(TaskResponseDto, {
    summary: 'Get a task by ID',
    param: { name: 'id', type: String, description: 'Task ID' },
  })
  getTaskById(@Param('id') id: string): Promise<TaskResponseDto> {
    return this.tasksService.getTaskById(id);
  }

  // ---------------- CREATE TASK ----------------
  @Post()
  @ApiStandardResponses(TaskResponseDto, {
    summary: 'Create a new task',
    status: 201,
    auth: true,
  })
  createTask(@Body() dto: CreateTaskDto): Promise<TaskResponseDto> {
    return this.tasksService.createTask(dto);
  }

  // ---------------- UPDATE TASK ----------------
  @Patch(':id')
  @ApiStandardResponses(TaskResponseDto, {
    summary: 'Update a task by ID',
    param: { name: 'id', type: String, description: 'Task ID' },
  })
  updateTaskById(
    @Body() updateDto: UpdateTaskDto,
    @Param('id') id: string,
  ): Promise<TaskResponseDto> {
    return this.tasksService.updateTaskById(id, updateDto);
  }

  // ---------------- UPDATE TASK STATUS ----------------
  @Patch(':id/status')
  @ApiStandardResponses(TaskResponseDto, {
    summary: "Update a task's status",
    param: { name: 'id', type: String, description: 'Task ID' },
  })
  updateTaskStatusById(
    @Body() updateDto: UpdateTaskDto,
    @Param('id') id: string,
  ): Promise<TaskResponseDto> {
    return this.tasksService.updateTaskById(id, { status: updateDto.status });
  }

  // ---------------- DELETE TASK ----------------
  @Delete(':id')
  @ApiStandardResponses(TaskResponseDto, {
    summary: 'Delete a task by ID',
    param: { name: 'id', type: String, description: 'Task ID' },
  })
  deleteTaskById(@Param('id') id: string) {
    return this.tasksService.deleteTaskById(id);
  }
}
