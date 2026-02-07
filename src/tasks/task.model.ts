export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  created_at: Date | string;
}

export enum TaskStatus {
  OPEN = 'OPEN',
  IN_PROGRESS = 'IN_PROGRESS',
  DONE = 'DONE',
}
