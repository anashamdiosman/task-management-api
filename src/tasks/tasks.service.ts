import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './tasks.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private tasksRepository: Repository<Task>,
  ) {}
  async createTask(dto: CreateTaskDto):  {
    const { title, description } = dto;
    this.tasksRepository.save({ title, description });
  }

  // getAllTasks(): Task[] {
  //   return this.tasks;
  // }

  // getAllTasksWithFilters(filter: FilterTasksDto): Task[] {
  //   return this.tasks.filter((item) => {
  //     const matchesStatus =
  //       !filter.status ||
  //       item.status.toLowerCase() === filter.status.toLowerCase();

  //     const matchesSearch =
  //       !filter.search ||
  //       item.status.toLowerCase().includes(filter.search.toLowerCase()) ||
  //       item.description.toLowerCase().includes(filter.search.toLowerCase());

  //     return matchesStatus && matchesSearch;
  //   });
  // }

  // getTaskById(id: string): Task {
  //   const task = this.tasks.find((task) => task.id === id) || null;
  //   if (!task) throw new NotFoundException(`Task with id ${id} not found`);
  //   return task;
  // }

  // createTask(dto: CreateTaskDto): Task {
  //   const { title, description } = dto;
  //   const newTask: Task = {
  //     id: (this.tasks.length + 1).toString(),
  //     title,
  //     description,
  //     status: TaskStatus.OPEN,
  //     created_at: new Date(),
  //   };
  //   this.tasks.push(newTask);
  //   return newTask;
  // }

  // deleteTaskById(id: string): Task[] {
  //   const task = this.getTaskById(id);
  //   this.tasks = this.tasks.filter((item) => item?.id !== task.id);
  //   return this.tasks;
  // }

  // updateTaskByStatusId(id: string, dto: UpdateTaskStatusDto): Task | null {
  //   const { status } = dto;
  //   const task = this.getTaskById(id);
  //   task.status = status;
  //   return task;
  // }
}
