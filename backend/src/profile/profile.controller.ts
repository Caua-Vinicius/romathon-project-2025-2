import { Controller, Get, UseGuards } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/common/guards/auth.guard';
import type { User } from '@prisma/client';
import { GetUser } from 'src/common/decorators/get-user.decorator';

@ApiBearerAuth()
@Controller('profile')
@UseGuards(JwtAuthGuard)
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Get('me')
  @ApiOperation({
    summary: 'Get the full profile data of the authenticated user.',
  })
  async getFullUserProfileData(@GetUser() user: User): Promise<User> {
    return await this.profileService.getProfileFullInfo(user.id);
  }
}
