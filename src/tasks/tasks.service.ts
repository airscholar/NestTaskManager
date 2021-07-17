import { TaskFilterDTO } from './dto/task-filter.dto';
import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { validate } from 'class-validator';
import { Repository } from 'typeorm';
import { CreateTaskDTO } from './dto/create-task.dto';
import { Task, TaskStatus } from './entities/task.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task) private readonly taskRepository: Repository<Task>,
  ) {}

  async create(createTaskDto: CreateTaskDTO): Promise<Task> {
    const validationResult = await this.validateInput(createTaskDto);

    if (validationResult) {
      const { title, description, status } = createTaskDto;

      const existing_task = await this.taskRepository.findOne({ title });
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

      return await this.taskRepository.save(task);
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

  async findAll() {
    return await this.taskRepository.find();
  }

  async getTasksWithFilters(filterDto: TaskFilterDTO) {
    const { search, status } = filterDto;

    let tasks = await this.findAll();

    if (status) {
      tasks = tasks.filter((task) => task.status === status);
    }

    if (search) {
      tasks = tasks.filter(
        (task) =>
          task.title.includes(search) || task.description.includes(search),
      );
    }

    return tasks;
  }

  async findOne(id: number) {
    return await this.taskRepository.findOne({ id });
  }

  async update(id: number, updateTaskDto: Task) {
    const validationResult = await this.validateInput(updateTaskDto);
    if (validationResult) {
      const existing_task = await this.getTaskById(id);

      const updated_task = Object.assign(existing_task, updateTaskDto);

      return await this.taskRepository.save(updated_task);
    }
  }

  private async getTaskById(id: number) {
    const existing_task = await this.taskRepository.findOne({
      id,
    });

    if (!existing_task) {
      throw new NotFoundException({ message: 'Task not found!' });
    }

    return existing_task;
  }
  async updateStatus(id: number, status: TaskStatus) {
    const existing_task = await this.getTaskById(id);
    existing_task.status = status;
    return await this.taskRepository.save(existing_task);
  }

  async remove(id: number) {
    const existing_task = await this.getTaskById(id);

    await this.taskRepository.delete({ id });

    return { message: 'Task Deleted Successfully!' };
  }
}
