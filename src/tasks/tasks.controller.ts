import { Controller } from '@nestjs/common';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  // @Get()
  // getAllTasks(@Query() filterDto: FilterTasksDto): Task[] {
  //   if (Object.keys(filterDto).length) {
  //     return this.tasksService.getAllTasksWithFilters(filterDto);
  //   }
  //   return this.tasksService.getAllTasks();
  // }

  // @Get(':id')
  // getTaskById(@Param('id') id: string): Task | null {
  //   return this.tasksService.getTaskById(id);
  // }

  // @Post()
  // createTask(@Body() dto: CreateTaskDto): Task {
  //   return this.tasksService.createTask(dto);
  // }

  // @Delete(':id')
  // deleteTaskById(@Param('id') id: string): Task[] | null {
  //   return this.tasksService.deleteTaskById(id);
  // }

  // @Patch(':id/status')
  // updateTaskStatusById(
  //   @Param('id') id: string,
  //   @Body() dto: UpdateTaskStatusDto,
  // ) {
  //   return this.tasksService.updateTaskByStatusId(id, dto);
  // }
}
