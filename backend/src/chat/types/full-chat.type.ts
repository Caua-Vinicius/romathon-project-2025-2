import { ChatSession, Message } from '@prisma/client';

export type FullChat = ChatSession & {
  messages: Message[];
};
