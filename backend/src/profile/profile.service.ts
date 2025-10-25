import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class ProfileService {
  constructor(private readonly prisma: PrismaService) {}

  async getProfileFullInfo(userId: string): Promise<User> {
    return await this.prisma.user.findFirstOrThrow({
      where: { id: userId },
      include: {
        achievements: true,
        profileData: true,
      },
    });
  }
}
