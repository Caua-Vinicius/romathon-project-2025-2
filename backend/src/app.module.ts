import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { GeminiModule } from './gemini/gemini.module';
import { ChatModule } from './chat/chat.module';

@Module({
  imports: [AuthModule, GeminiModule, ChatModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
