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

  getTaskById(id: string): Task | null {
    return this.tasks.find((task) => task.id === id) || null;
  }

  createTask(title: string, description: string): Task {
    const newTask: Task = {
      id: (this.tasks.length + 1).toString(),
      title,
      description,
      status: TaskStatus.OPEN,
      created_at: new Date(),
    };
    this.tasks.push(newTask);
    return newTask;
  }
}
