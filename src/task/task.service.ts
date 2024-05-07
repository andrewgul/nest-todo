import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class TaskService {
  constructor(private prisma: PrismaService) {}

  async getById(id: string) {
    const task = await this.prisma.task.findUnique({
      where: { id },
    });

    if (!task) {
      throw new NotFoundException('Task not found');
    }

    return task;
  }

  async findAll(userId: string) {
    return await this.prisma.task.findMany({
      where: {
        userId: userId,
      },
    });
  }

  async create(dto: CreateTaskDto, userId: string) {
    return await this.prisma.task.create({
      data: {
        ...dto,
        user: {
          connect: {
            id: userId,
          },
        },
      },
    });
  }

  async toggle(id: string) {
    const task = await this.getById(id);

    return await this.prisma.task.update({
      where: {
        id: task.id,
      },
      data: {
        isDone: !task.isDone,
      },
    });
  }

  async changePriority(id: string, priority: number) {
    const task = await this.getById(id);

    return await this.prisma.task.update({
      where: {
        id: task.id,
      },
      data: {
        priority,
      },
    });
  }
}
