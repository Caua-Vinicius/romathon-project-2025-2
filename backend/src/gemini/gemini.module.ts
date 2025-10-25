import { Module } from '@nestjs/common';
import { GeminiService } from './gemini.service';
import { GoogleGenAI } from '@google/genai';

@Module({
  providers: [
    {
      provide: 'GOOGLE_GEMINI_CLIENT',
      useFactory: () => {
        const apiKey = process.env.GOOGLE_API_KEY;
        if (!apiKey) {
          throw new Error('GOOGLE_API_KEY environment variable not set');
        }
        return new GoogleGenAI({ apiKey });
      },
    },
    GeminiService,
  ],
  exports: [GeminiService],
})
export class GeminiModule {}
