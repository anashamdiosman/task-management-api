import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from '../entities/tasks.entity';
import { Repository } from 'typeorm';
import { TaskStatus } from './enums/tasks-status.enum';
import { CreateTaskDto, UpdateTaskDto, FilterTasksDto } from './dto';
import { User } from 'src/entities/users.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private tasksRepository: Repository<Task>,
  ) {}
  async createTask(dto: CreateTaskDto, user: User): Promise<Task> {
    const task = this.tasksRepository.create({
      ...dto,
      status: TaskStatus.OPEN,
      user,
    });
    return await this.tasksRepository.save(task);
  }

  async getTaskById(id: string, user: User): Promise<Task> {
    const task = await this.tasksRepository.findOneBy({
      id,
      user: { id: user.id },
    });
    if (!task) throw new NotFoundException(`Task with id ${id} not found`);
    return task;
  }

  async deleteTaskById(id: string, user: User): Promise<void> {
    const task = await this.getTaskById(id, user); // fetch and ensure ownership
    await this.tasksRepository.remove(task); // remove the task
  }

  async updateTaskById(
    id: string,
    updateTaskDto: UpdateTaskDto,
    user: User,
  ): Promise<Task> {
    const task = await this.getTaskById(id, user); // fetch and ensure ownership
    Object.assign(task, updateTaskDto); // update fields
    return this.tasksRepository.save(task); // save changes
  }

  async getAllTasks(filterDto: FilterTasksDto, user: User): Promise<Task[]> {
    const { status, search } = filterDto;

    const query = this.tasksRepository.createQueryBuilder('tasks');

    query.where('tasks.userId = :userId', { userId: user.id });

    if (status) query.andWhere('tasks.status = :status', { status });
    if (search)
      query.andWhere(
        '(LOWER(tasks.title) LIKE LOWER(:search) OR LOWER(tasks.description) LIKE LOWER(:search))',
        { search: `%${search}%` },
      );

    query.leftJoinAndSelect('tasks.user', 'user');

    const tasks = await query.getMany();
    return tasks;
  }
}
