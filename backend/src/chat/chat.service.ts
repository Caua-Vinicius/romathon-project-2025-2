import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { GeminiService } from 'src/gemini/gemini.service';
import { AchievementMaster, ChatSession } from '@prisma/client';
import { ModelRoles } from 'src/common/constants';
import { FullChat } from './types/full-chat.type';
import { CreateNewMessageDto } from './dto/create-new-message.dto';

@Injectable()
export class ChatService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly geminiService: GeminiService,
  ) {}

  async createNewSession(userId: string): Promise<ChatSession> {
    const countUserSessions = await this.prisma.chatSession.count({
      where: {
        userId,
      },
    });
    return await this.prisma.chatSession.create({
      data: {
        title: `Jornada ${countUserSessions + 1}`,
        user: {
          connect: { id: userId },
        },
        messages: {
          create: {
            content:
              'Olá. Eu sou a LUMICA. Estou aqui para iniciar sua jornada de autoconhecimento. Sobre o que gostaria de refletir primeiro?',
            role: ModelRoles.MODEL,
          },
        },
      },
    });
  }

  async fetchAllChatSessions(userId: string): Promise<ChatSession[]> {
    return await this.prisma.chatSession.findMany({
      where: {
        userId,
      },
    });
  }

  async fetchSessionHistory(sessionId: string): Promise<FullChat> {
    return await this.prisma.chatSession.findFirstOrThrow({
      where: {
        id: sessionId,
      },
      include: {
        messages: {
          orderBy: {
            createdAt: 'asc',
          },
        },
      },
    });
  }

  async sendNewMessage(
    userId: string,
    sessionId: string,
    createNewMessageDto: CreateNewMessageDto,
  ) {
    return await this.prisma.$transaction(async (tx) => {
      // add the user message to the history
      await tx.message.create({
        data: {
          content: createNewMessageDto.content,
          role: ModelRoles.USER,
          session: {
            connect: { id: sessionId },
          },
        },
      });

      const chatHistory = await tx.message.findMany({
        where: {
          sessionId,
        },
        select: {
          role: true,
          content: true,
        },
        orderBy: {
          createdAt: 'asc',
        },
      });
      const messagesHistory = chatHistory.map((msg) => ({
        role: msg.role,
        parts: [{ text: msg.content }],
      }));

      const PromiseModelResponse = this.geminiService.generate(messagesHistory);

      let unlockedAchievement: null | AchievementMaster = null;
      let xpGained = 0;

      const textMessage = await PromiseModelResponse;

      await tx.message.create({
        data: {
          content: textMessage,
          role: ModelRoles.MODEL,
          session: {
            connect: { id: sessionId },
          },
        },
      });

      if (messagesHistory.length % 5 === 0) {
        const JsonPayload = [
          ...messagesHistory,
          {
            role: ModelRoles.USER, // Finja ser o usuário pedindo a análise
            parts: [
              {
                text: 'Com base em todo o nosso histórico de chat até agora, por favor, analise a conversa e gere um objeto JSON com as palavras-chave, áreas e a conquista principal. Responda *apenas* com o objeto JSON.',
              },
            ],
          },
        ];
        const jsonAnalysis = await this.geminiService.generateJson(JsonPayload);
        const { keywords, areas, achievement_key } = jsonAnalysis;

        await tx.userProfileData.update({
          where: { userId: userId },
          data: {
            keywords: { push: keywords },
            areas: { push: areas },
          },
        });

        let achievement = await tx.achievementMaster.findFirst({
          where: {
            title: achievement_key,
          },
        });
        if (!achievement) {
          achievement = await tx.achievementMaster.create({
            data: {
              title: achievement_key,
              color: 'yellow',
              description: '',
              icon: '',
            },
          });
        }

        const existingUserAchievement = await tx.userAchievement.findFirst({
          where: {
            userId,
            achievementId: achievement.id,
          },
        });

        if (!existingUserAchievement) {
          await tx.userAchievement.create({
            data: {
              achievement: {
                connect: {
                  id: achievement.id,
                },
              },
              user: {
                connect: {
                  id: userId,
                },
              },
            },
          });
        }

        unlockedAchievement = achievement;
        xpGained = 100;
      }

      if (xpGained > 0) {
        const userProfile = await tx.user.findUnique({
          where: { id: userId },
        });
        if (!userProfile) throw new Error('User not found');

        let currentXp = userProfile.clarityXp + xpGained;
        let currentLevel = userProfile.clarityLevel;
        let xpToNextLevel = userProfile.xpToNextLevel;

        // "Level Up" logic
        if (currentXp >= xpToNextLevel) {
          currentLevel++;
          currentXp = currentXp - xpToNextLevel;
          xpToNextLevel = Math.floor(xpToNextLevel * 1.2);
        }

        // Save the user's new XP/Level state
        await tx.user.update({
          where: { id: userId },
          data: {
            clarityLevel: currentLevel,
            clarityXp: currentXp,
            xpToNextLevel: xpToNextLevel,
          },
        });
      }
      return {
        role: ModelRoles.MODEL,
        content: textMessage,
        newAchievement: unlockedAchievement,
      };
    });
  }

  async deleteSession(sessionId: string): Promise<ChatSession> {
    return await this.prisma.chatSession.delete({
      where: {
        id: sessionId,
      },
    });
  }
}
