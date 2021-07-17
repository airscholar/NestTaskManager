import { TaskStatus } from './../entities/task.entity';
export interface TaskInterface {
  title: string;
  description: string;
  status: TaskStatus;
}
