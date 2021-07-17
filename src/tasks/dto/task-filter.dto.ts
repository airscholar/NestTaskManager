import { Optional } from '@nestjs/common';
import { IsIn } from 'class-validator';
import { TaskStatus } from '../entities/task.entity';

export class TaskFilterDTO {
  @Optional()
  @IsIn([TaskStatus.OPEN, TaskStatus.IN_PROGRESS, TaskStatus.DONE])
  status: TaskStatus;
  @Optional()
  search: string;
}
