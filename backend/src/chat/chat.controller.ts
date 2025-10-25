import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ChatService } from './chat.service';
import { JwtAuthGuard } from 'src/common/guards/auth.guard';
import type { ChatSession, User } from '@prisma/client';
import { GetUser } from 'src/common/decorators/get-user.decorator';
import { FullChat } from './types/full-chat.type';
import { CreateNewMessageDto } from './dto/create-new-message.dto';
import { NewMessageResponseType } from './types/new-message-response.type';
import { ApiBearerAuth } from '@nestjs/swagger';

@ApiBearerAuth()
@Controller('chat/sessions')
@UseGuards(JwtAuthGuard)
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Get()
  async listUserSessions(@GetUser() user: User): Promise<ChatSession[]> {
    return await this.chatService.fetchAllChatSessions(user.id);
  }

  @Post()
  async createChatSession(@GetUser() user: User): Promise<ChatSession> {
    return await this.chatService.createNewSession(user.id);
  }

  @Get('/:sessionId')
  async getSessionHistory(
    @Param('sessionId') sessionId: string,
  ): Promise<FullChat> {
    return await this.chatService.fetchSessionHistory(sessionId);
  }

  @Post('/:sessionId/message')
  async sendNewMessageToChat(
    @Param('sessionId') sessionId: string,
    @GetUser() user: User,
    @Body() createNewMessageDto: CreateNewMessageDto,
  ): Promise<NewMessageResponseType> {
    return await this.chatService.sendNewMessage(
      user.id,
      sessionId,
      createNewMessageDto,
    );
  }

  @Delete('/:sessionId')
  async deleteChat(
    @Param('sessionId') sessionId: string,
  ): Promise<ChatSession> {
    return await this.chatService.deleteSession(sessionId);
  }
}
