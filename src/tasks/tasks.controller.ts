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

@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  async findAll(@Query(ValidationPipe) taskFilterDTO: TaskFilterDTO) {
    console.log(taskFilterDTO);
    return await this.tasksService.getTasksWithFilters(taskFilterDTO);
  }

  @UsePipes(new ValidationPipe())
  @Post()
  async create(@Body() createTaskDto: CreateTaskDTO) {
    return await this.tasksService.create(createTaskDto);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.tasksService.findOne(+id);
  }

  @UsePipes(new ValidationPipe())
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateTaskDto: Task) {
    return await this.tasksService.update(+id, updateTaskDto);
  }

  @Patch(':id/status')
  async updateStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body('status', TaskStatusValidationPipe) status: TaskStatus,
  ) {
    return await this.tasksService.updateStatus(+id, status);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.tasksService.remove(+id);
  }
}
