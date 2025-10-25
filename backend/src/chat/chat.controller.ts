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
import { ApiBearerAuth, ApiOperation, ApiTags, ApiBody } from '@nestjs/swagger';

@ApiTags('Chat')
@ApiBearerAuth()
@Controller('chat/sessions')
@UseGuards(JwtAuthGuard)
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Get()
  @ApiOperation({ summary: 'List all chat sessions for the current user.' })
  async listUserSessions(@GetUser() user: User): Promise<ChatSession[]> {
    return await this.chatService.fetchAllChatSessions(user.id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new chat session for the current user.' })
  async createChatSession(@GetUser() user: User): Promise<ChatSession> {
    return await this.chatService.createNewSession(user.id);
  }

  @Get('/:sessionId')
  @ApiOperation({ summary: 'Get the full message history of a chat session.' })
  async getSessionHistory(
    @Param('sessionId') sessionId: string,
  ): Promise<FullChat> {
    return await this.chatService.fetchSessionHistory(sessionId);
  }

  @Post('/:sessionId/message')
  @ApiOperation({
    summary:
      'Send a new message to a chat session and process XP/achievements.',
  })
  @ApiBody({ type: CreateNewMessageDto })
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
  @ApiOperation({ summary: 'Delete a specific chat session.' })
  async deleteChat(
    @Param('sessionId') sessionId: string,
  ): Promise<ChatSession> {
    return await this.chatService.deleteSession(sessionId);
  }
}
