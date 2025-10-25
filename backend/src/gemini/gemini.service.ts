import { ContentListUnion, GoogleGenAI } from '@google/genai';
import {
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { SYSTEM_PROMPT } from 'src/chat/prompts/system-instructions.prompt';
import { VOCATIONAL_PROMPT } from 'src/chat/prompts/vocational-profile.prompt';

@Injectable()
export class GeminiService {
  constructor(
    @Inject('GOOGLE_GEMINI_CLIENT') private readonly client: GoogleGenAI,
  ) {}

  async generate(prompts: ContentListUnion): Promise<string> {
    try {
      const response = await this.client.models.generateContent({
        config: {
          systemInstruction: SYSTEM_PROMPT,
        },
        model: 'gemini-2.0-flash-lite',
        contents: prompts,
      });
      if (!response.text) throw new Error('Gemini returned nothing');
      return response.text;
    } catch (error) {
      console.error('Error calling the Gemini API:', error);
      throw new InternalServerErrorException('Failed to generate content.');
    }
  }

  async generateJson(prompt: ContentListUnion): Promise<{
    keywords: string[];
    areas: string[];
    achievement_key: string;
  }> {
    try {
      const response = await this.client.models.generateContent({
        model: 'gemini-2.0-flash-lite',
        contents: prompt,
        config: {
          systemInstruction: VOCATIONAL_PROMPT,
          responseJsonSchema: {
            schema: {
              type: 'object',
              properties: {
                keywords: { type: 'array', items: { type: 'string' } },
                areas: { type: 'array', items: { type: 'string' } },
                achievement_key: { type: 'string' },
              },
              required: ['keywords', 'areas', 'achievement_key'],
            },
          },
        },
      });
      if (!response.text) throw new Error('Gemini returned nothing');
      let jsonString = response.text;

      jsonString = jsonString
        .replace(/^```json\s*/, '')
        .replace(/```$/, '')
        .trim();

      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return JSON.parse(jsonString);
    } catch (error) {
      console.error('Error calling the Gemini API:', error);
      throw new InternalServerErrorException('Failed to generate content.');
    }
  }
}
