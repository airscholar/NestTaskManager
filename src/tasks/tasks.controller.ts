import { TaskFilterDTO } from './dto/task-filter.dto';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UsePipes,
  ValidationPipe,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task, TaskStatus } from './entities/task.entity';
import { CreateTaskDTO } from './dto/create-task.dto';
import { TaskStatusValidationPipe } from './pipes/task-status-validation.pipe';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/auth.decorator';
import { User } from 'src/auth/entities/user.entity';

@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  async findAll(
    @Query(ValidationPipe) taskFilterDTO: TaskFilterDTO,
    @GetUser() user: User,
  ) {
    return await this.tasksService.getTasksWithFilters(taskFilterDTO, user);
  }

  @UsePipes(new ValidationPipe())
  @Post()
  async create(@Body() createTaskDto: CreateTaskDTO, @GetUser() user: User) {
    return await this.tasksService.create(createTaskDto, user);
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @GetUser() user: User) {
    return await this.tasksService.findOne(+id, user);
  }

  @UsePipes(new ValidationPipe())
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateTaskDto: Task,
    @GetUser() user: User,
  ) {
    return await this.tasksService.update(+id, updateTaskDto, user);
  }

  @Patch(':id/status')
  async updateStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body('status', TaskStatusValidationPipe) status: TaskStatus,
    @GetUser() user: User,
  ) {
    return await this.tasksService.updateStatus(+id, status, user);
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @GetUser() user: User) {
    return await this.tasksService.remove(+id, user);
  }
}
