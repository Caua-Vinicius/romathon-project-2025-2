export interface IMessage {
  sessionId: string;
  content: string;
  sender: "user" | "bot";
}
