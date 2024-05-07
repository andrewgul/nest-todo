import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
  Request,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskPriorityDto } from './dto/update-task-priority.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@UseGuards(AuthGuard)
@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get()
  async getTasks(@Request() req) {
    const userId = req['user'].sub;

    return await this.taskService.findAll(userId);
  }

  @Get(':id')
  async getTask(@Param('id', ParseUUIDPipe) id: string) {
    return await this.taskService.getById(id);
  }

  @Post()
  @UsePipes(new ValidationPipe())
  async createTask(@Body() dto: CreateTaskDto, @Request() req) {
    const userId = req['user'].sub;

    return await this.taskService.create(dto, userId);
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
