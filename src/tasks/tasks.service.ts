import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';

@Injectable()
export class TasksService {
  private tasks: Task[] = [
    {
      id: 'learn-nestjs',
      title: 'Learn Nest.js',
      description:
        'Nest.js is a framework for building efficient, scalable Node.js applications.',
      status: TaskStatus.OPEN,
      created_at: new Date(),
    },
  ];

  getTasks(): Task[] {
    return this.tasks;
  }
}
