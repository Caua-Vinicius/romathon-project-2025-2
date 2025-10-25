import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatController } from './chat.controller';
import { GeminiModule } from 'src/gemini/gemini.module';
import { PrismaService } from 'prisma/prisma.service';

@Module({
  imports: [GeminiModule],
  providers: [ChatService, PrismaService],
  controllers: [ChatController],
})
export class ChatModule {}
