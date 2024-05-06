import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskDto } from './task.dto';
import { v4 as uuidv4 } from 'uuid';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class TaskService {
  constructor(private prisma: PrismaService) {}

  async getById(id: string) {
    const task = await this.prisma.task.findUnique({
      where: { id },
    })

    if (!task) {
      throw new NotFoundException('Task not found')
    }

    return task;
  }

  async findAll() {
    return await this.prisma.task.findMany();
  }

  async create(dto: TaskDto) {
    return await this.prisma.task.create({
      data: dto
    });
  }

  async toggle(id: string) {
    const task = await this.getById(id)

    return await this.prisma.task.update({
      where: {
        id: task.id,
      },
      data: {
        isDone: !task.isDone,
      },
    })
  }
}
