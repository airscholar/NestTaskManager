import { BadRequestException } from '@nestjs/common';
import { PipeTransform } from '@nestjs/common';
import { TaskStatus } from '../entities/task.entity';

export class TaskStatusValidationPipe implements PipeTransform {
  readonly allowed_values: string[] = [
    TaskStatus.OPEN,
    TaskStatus.IN_PROGRESS,
    TaskStatus.DONE,
  ];

  transform(value: any) {
    value = value.toUpperCase();
    if (!this.validateTaskStatus(value)) {
      throw new BadRequestException(
        `"${value}" is an invalid status. Please try again!`,
      );
    }
  }

  private validateTaskStatus(status) {
    const idx = this.allowed_values.indexOf(status);

    return idx !== -1;
  }
}
