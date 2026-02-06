import { Injectable } from '@nestjs/common';

@Injectable()
export class TasksService {
  private tasks = [{ id: 1, name: 'Learn Nest.js', when: new Date() }];

  getTasks(): typeof this.tasks {
    return this.tasks;
  }
}
