import { create } from 'zustand';

export interface Message {
  taskId: number;
  userId: string;
  message: string;
}

interface NoticeMessageType {
  messages: Message[];
  setMessage: (newMessage: Message) => void;
}

export const useNoticeMessage = create<NoticeMessageType>((set) => ({
  messages: [],
  setMessage: (newMessage) => {
    set((state) => ({
      messages: [...state.messages, newMessage],
    }));
  },
}));
