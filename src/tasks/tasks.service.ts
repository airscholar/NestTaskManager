import { TaskFilterDTO } from './dto/task-filter.dto';
import { TaskRepository } from './tasks.repository';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTaskDTO } from './dto/create-task.dto';
import { Task, TaskStatus } from './entities/task.entity';
import { User } from 'src/auth/entities/user.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskRepository)
    private readonly taskRepository: TaskRepository,
  ) {}

  async createTask(createTaskDto: CreateTaskDTO, user: User): Promise<Task> {
    const task = await this.taskRepository.createTask(createTaskDto, user);
    return task;
  }

  async getTasksWithFilters(filterDto: TaskFilterDTO, user: User) {
    const tasks = this.taskRepository.getTasksWithFilters(filterDto, user);

    return tasks;
  }

  async findOne(id: number, user: User) {
    return await this.taskRepository.findOneTask(id, user);
  }

  async update(id: number, updateTaskDto: Task, user: User) {
    return await this.taskRepository.updateTask(id, updateTaskDto, user);
  }

  private async getTaskById(id: number, user: User) {
    return await this.taskRepository.findOneTask(id, user);
  }
  async updateStatus(id: number, status: string, user: User) {
    const existing_task = await this.getTaskById(id, user);
    existing_task.status = TaskStatus[status];
    return await this.taskRepository.save(existing_task);
  }

  async remove(id: number, user: User) {
    await this.getTaskById(id, user);

    await this.taskRepository.delete({ id });

    return { message: 'Task Deleted Successfully!' };
  }
}
