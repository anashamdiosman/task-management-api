import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from '../entities/tasks.entity';
import { Repository } from 'typeorm';
import { TaskStatus } from './enums/tasks-status.enum';
import { CreateTaskDto, UpdateTaskDto, FilterTasksDto } from './dto';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private tasksRepository: Repository<Task>,
  ) {}
  async createTask(dto: CreateTaskDto): Promise<Task> {
    const task = this.tasksRepository.create({
      ...dto,
      status: TaskStatus.OPEN,
    });
    return await this.tasksRepository.save(task);
  }

  async getTaskById(id: string): Promise<Task> {
    const task = await this.tasksRepository.findOneBy({ id });
    if (!task) throw new NotFoundException(`Task with id ${id} not found`);
    return task;
  }

  async deleteTaskById(id: string): Promise<void> {
    const result = await this.tasksRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Task with id ${id} not found`);
    }
  }

  async updateTaskById(
    id: string,
    updateTaskDto: UpdateTaskDto,
  ): Promise<Task> {
    await this.tasksRepository.update(id, updateTaskDto);
    return this.getTaskById(id);
  }

  async getAllTasks(filterDto: FilterTasksDto): Promise<Task[]> {
    const { status, search } = filterDto;

    // tasks is only alias and not the real table name
    const query = this.tasksRepository.createQueryBuilder('tasks');

    // here we have to use the alias name provided earlier especially in JOINS
    if (status) query.andWhere('tasks.status = :status', { status });
    if (search)
      query.andWhere(
        // here we have to use the alias name provided earlier especially in JOINS
        'tasks.title LIKE :search OR tasks.description LIKE :search',
        {
          search: `%${search}%`,
        },
      );

    const tasks = await query.getMany();
    return tasks;
  }
}
