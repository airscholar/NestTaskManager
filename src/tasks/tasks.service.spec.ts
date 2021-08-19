import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { Task } from './entities/task.entity';
import { TasksService } from './tasks.service';

const mockTestRepository = () => ({

)};

describe('TasksService', () => {
  let tasksService: TasksService;
  let taskRepository: Repository<Task>;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        TasksService, 
        { provide: taskRepository, useFactory: mockTestRepository}
      ],
    }).compile();

    tasksService = await module.get<TasksService>(TasksService);
  });
});
