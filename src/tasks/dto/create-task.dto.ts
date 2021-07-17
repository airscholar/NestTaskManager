import { IsNotEmpty } from 'class-validator';
import { TaskStatus } from './../entities/task.entity';
export class CreateTaskDTO {
  @IsNotEmpty()
  title: string;
  @IsNotEmpty()
  description: string;
  status?: TaskStatus;
}
