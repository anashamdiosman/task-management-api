import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
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
import { plainToInstance } from 'class-transformer';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/entities/users.entity';

@ApiTags('Tasks')
@Controller('tasks')
@UseGuards(AuthGuard('jwt')) // Apply authentication guard to all routes in this controller
export class TasksController {
  constructor(private tasksService: TasksService) {}

  // ---------------- GET ALL TASKS ----------------
  @Get()
  @ApiStandardResponses(TaskResponseDto, {
    summary: 'Get all tasks',
    isArray: true,
    actionType: 'read',
    auth: true,
  })
  async getAllTasks(
    @Query() filterDto: FilterTasksDto,
    @GetUser() user: User,
  ): Promise<TaskResponseDto[]> {
    const tasks = await this.tasksService.getAllTasks(filterDto, user);
    return plainToInstance(TaskResponseDto, tasks, {
      excludeExtraneousValues: true,
    });
  }

  // ---------------- GET TASK BY ID ----------------
  @Get(':id')
  @ApiStandardResponses(TaskResponseDto, {
    summary: 'Get a task by ID',
    param: { name: 'id', type: String, description: 'Task ID' },
    actionType: 'read',
    auth: true,
  })
  async getTaskById(
    @Param('id') id: string,
    @GetUser() user: User,
  ): Promise<TaskResponseDto> {
    const task = await this.tasksService.getTaskById(id, user);
    return plainToInstance(TaskResponseDto, task, {
      excludeExtraneousValues: true,
    });
  }

  // ---------------- CREATE TASK ----------------
  @Post()
  @ApiStandardResponses(TaskResponseDto, {
    summary: 'Create a new task',
    status: 201,
    auth: true,
    actionType: 'create',
  })
  async createTask(
    @Body() dto: CreateTaskDto,
    @GetUser() user: User,
  ): Promise<TaskResponseDto> {
    const task = await this.tasksService.createTask(dto, user);
    return plainToInstance(TaskResponseDto, task, {
      excludeExtraneousValues: true,
    });
  }

  // ---------------- UPDATE TASK ----------------
  @Patch(':id')
  @ApiStandardResponses(TaskResponseDto, {
    summary: 'Update a task by ID',
    param: { name: 'id', type: String, description: 'Task ID' },
    actionType: 'update',
    auth: true,
  })
  async updateTaskById(
    @Body() updateDto: UpdateTaskDto,
    @Param('id') id: string,
    @GetUser() user: User,
  ): Promise<TaskResponseDto> {
    const task = await this.tasksService.updateTaskById(id, updateDto, user);
    return plainToInstance(TaskResponseDto, task, {
      excludeExtraneousValues: true,
    });
  }

  // ---------------- UPDATE TASK STATUS ----------------
  @Patch(':id/status')
  @ApiStandardResponses(TaskResponseDto, {
    summary: "Update a task's status",
    param: { name: 'id', type: String, description: 'Task ID' },
    actionType: 'update',
    auth: true,
  })
  async updateTaskStatusById(
    @Body() updateDto: UpdateTaskDto,
    @Param('id') id: string,
    @GetUser() user: User,
  ): Promise<TaskResponseDto> {
    const task = await this.tasksService.updateTaskById(
      id,
      {
        status: updateDto.status,
      },
      user,
    );
    return plainToInstance(TaskResponseDto, task, {
      excludeExtraneousValues: true,
    });
  }

  // ---------------- DELETE TASK ----------------
  @Delete(':id')
  @ApiStandardResponses(TaskResponseDto, {
    summary: 'Delete a task by ID',
    param: { name: 'id', type: String, description: 'Task ID' },
    actionType: 'delete',
    auth: true,
  })
  async deleteTaskById(
    @Param('id') id: string,
    @GetUser() user: User,
  ): Promise<TaskResponseDto> {
    const task = await this.tasksService.deleteTaskById(id, user);
    return plainToInstance(TaskResponseDto, task, {
      excludeExtraneousValues: true,
    });
  }
}
