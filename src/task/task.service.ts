import { Injectable } from '@nestjs/common';
import { TaskDto } from './task.dto';

@Injectable()
export class TaskService {
  private _tasks = [];

  findAll() {
    return this._tasks;
  }

  create(dto: TaskDto) {
    this._tasks.push({
      title: dto.title,
      isDone: false,
    });

    return this._tasks;
  }
}
