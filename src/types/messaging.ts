
export interface User {
  name: string;
  avatar?: string;
}

export interface Message {
  id: string;
  content: string;
  timestamp: Date;
  sender: 'user' | 'other';
}

export interface ConversationType {
  id: string;
  with: User;
  lastMessage: string;
  timestamp: Date;
  messages: Message[];
  unread: boolean;
}
