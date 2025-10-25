import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { GeminiModule } from './gemini/gemini.module';
import { ChatModule } from './chat/chat.module';
import { ProfileModule } from './profile/profile.module';

@Module({
  imports: [AuthModule, GeminiModule, ChatModule, ProfileModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
