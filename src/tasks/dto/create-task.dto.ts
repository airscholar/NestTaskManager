import { IsNotEmpty } from 'class-validator';
import { User } from 'src/auth/entities/user.entity';
import { TaskStatus } from './../entities/task.entity';
export class CreateTaskDTO {
  @IsNotEmpty()
  title: string;
  @IsNotEmpty()
  description: string;
  status?: TaskStatus;
  user: User;
}
