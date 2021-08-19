import { TaskFilterDTO } from './dto/task-filter.dto';
import { HttpException, HttpStatus, NotFoundException } from '@nestjs/common';
import { User } from 'src/auth/entities/user.entity';
import { EntityRepository, Repository } from 'typeorm';
import { CreateTaskDTO } from './dto/create-task.dto';
import { Task, TaskStatus } from './entities/task.entity';
import { validate } from 'class-validator';

@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {
  async createTask(createTaskDto: CreateTaskDTO, user: User): Promise<Task> {
    const validationResult = await this.validateInput(createTaskDto);

    if (validationResult) {
      const { title, description, status } = createTaskDto;

      const existing_task = await this.findOne({ title });
      if (existing_task) {
        const errors = { title: 'Task title must be unique.' };
        throw new HttpException(
          { message: 'Input data validation failed', errors },
          HttpStatus.BAD_REQUEST,
        );
      }

      const task = new Task();
      task.title = title;
      task.description = description;
      task.status = status;
      task.user = user;

      await this.save(task);

      delete task.user;
      return task;
    }
  }

  private async validateInput(createTaskDto: CreateTaskDTO) {
    const errors = await validate(createTaskDto);
    if (errors.length > 0) {
      const _errors = { username: 'Input is invalid. Please try again!' };
      throw new HttpException(
        { message: 'Input data validation failed', _errors },
        HttpStatus.BAD_REQUEST,
      );
    }
    return true;
  }

  async getTasksWithFilters(filterDto: TaskFilterDTO, user: User) {
    const { search, status } = filterDto;

    let query = this.createQueryBuilder('task');

    query.andWhere('task.userId = :userId', { userId: user.id });

    if (status && status !== TaskStatus.ALL) {
      query = query.andWhere('task.status = :status', { status });
    }

    if (search) {
      query = query.andWhere(
        'task.title LIKE :search OR task.description LIKE :search',
        { search: `%${search}%` },
      );
    }

    const tasks = await query.getMany();

    return tasks;
  }

  async findOneTask(id: number, user: User) {
    return await this.findOne({
      where: {
        id,
        user: user.id,
      },
    });
  }

  async updateTask(id: number, updateTaskDto: Task, user: User) {
    const validationResult = await this.validateInput(updateTaskDto);
    if (validationResult) {
      const existing_task = await this.getTaskById(id, user);

      const updated_task = Object.assign(existing_task, updateTaskDto);

      return await this.save(updated_task);
    }
  }

  private async getTaskById(id: number, user: User) {
    const existing_task = await this.findOne({
      where: {
        id,
        userId: user.id,
      },
    });

    if (!existing_task) {
      throw new NotFoundException({ message: 'Task not found!' });
    }

    return existing_task;
  }
  async updateStatus(id: number, status: string, user: User) {
    const existing_task = await this.getTaskById(id, user);
    existing_task.status = TaskStatus[status];
    return await this.save(existing_task);
  }

  async removeTask(id: number, user: User) {
    await this.getTaskById(id, user);

    await this.delete({ id });

    return { message: 'Task Deleted Successfully!' };
  }
}
