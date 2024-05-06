import { Body, Controller, Get, Param, ParseUUIDPipe, Patch, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskDto } from './task.dto';

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get()
  async getTasks() {
    return await this.taskService.findAll();
  }

  @Get(':id')
  async getTask(@Param('id', ParseUUIDPipe) id: string) {
    return await this.taskService.getById(id);
  }

  @Post()
  @UsePipes(new ValidationPipe())
  async createTask(@Body() dto: TaskDto) {
    return await this.taskService.create(dto);
  }

  @Patch(':id')
  async toggle(@Param('id', ParseUUIDPipe) id: string) {
    return await this.taskService.toggle(id);
  }

  // @todo
  async changePriority() {}
}
