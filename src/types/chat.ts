export interface ChatMessage {
  id: string;
  text: string;
  sender: 'user' | 'admin';
  timestamp: Date;
  isRead?: boolean;
}

export interface ChatSession {
  id: string;
  userId: string;
  messages: ChatMessage[];
  isActive: boolean;
  createdAt: Date;
  lastMessageAt: Date;
}

export interface ChatState {
  isOpen: boolean;
  isConnected: boolean;
  messages: ChatMessage[];
  currentSession: string | null;
  isTyping: boolean;
}
