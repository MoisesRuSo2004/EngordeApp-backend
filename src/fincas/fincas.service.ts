import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateFincaDto } from './dto/create-finca.dto';

@Injectable()
export class FincasService {
  constructor(private prisma: PrismaService) {}

  create(userId: string, dto: CreateFincaDto) {
    return this.prisma.finca.create({
      data: { ...dto, userId },
    });
  }

  findAll(userId: string) {
    return this.prisma.finca.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(userId: string, id: string) {
    const finca = await this.prisma.finca.findFirst({
      where: { id, userId },
    });
    if (!finca) throw new NotFoundException('Finca no encontrada');
    return finca;
  }

  async update(userId: string, id: string, dto: Partial<CreateFincaDto>) {
    await this.findOne(userId, id);
    return this.prisma.finca.update({ where: { id }, data: dto });
  }

  async remove(userId: string, id: string) {
    await this.findOne(userId, id);
    return this.prisma.finca.delete({ where: { id } });
  }
}
