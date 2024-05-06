import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskPriorityDto } from './dto/update-task-priority.dto';

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
  async createTask(@Body() dto: CreateTaskDto) {
    return await this.taskService.create(dto);
  }

  @Patch(':id')
  async toggle(@Param('id', ParseUUIDPipe) id: string) {
    return await this.taskService.toggle(id);
  }

  @Patch('priority/:id')
  @UsePipes(new ValidationPipe())
  async changePriority(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateTaskPriorityDto,
  ) {
    return await this.taskService.changePriority(id, dto.priority);
  }
}
