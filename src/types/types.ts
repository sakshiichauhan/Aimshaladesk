export type Channel = "whatsapp" | "email";
export type MessageType = "approved" | "suggest";

export interface Template {
  id: string;
  name: string;
  content: string;
  variables: string[];
  status: "approved" | "pending" | "rejected";
  channel: Channel;
  category: string;
  lastUsed?: Date;
  performance?: {
    sent: number;
    delivered: number;
    opened: number;
    clicked: number;
  };
}
