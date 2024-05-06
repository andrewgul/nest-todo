import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async getByName(name: string) {
    return await this.prisma.user.findFirst({
      where: {
        name,
      },
    });
  }

  async create(name: string, password: string) {
    const user = await this.getByName(name);

    if (user) {
      throw new ForbiddenException('User already exists');
    }

    return await this.prisma.user.create({
      data: {
        name,
        password,
      },
    });
  }
}
