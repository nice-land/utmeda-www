
export interface IIntlProps {
  languages: string[];
  language: string;
  messages: {[key: string]: string};
}

export type MessageType = 'incoming' | 'reply' | 'typing' | 'call' | 'reply-erase' | 'browser';

export interface IBubble {
  key: string;
  scene: 'both' | 'light' | 'dark';
  timestamp: number;
  duration: number;
  type: MessageType;
  msg?: string | { dark: string, light: string };
  seen?: { dark: boolean; light: boolean; };
  theme?: string;
}

export interface IStep {
  title: string;
  poster: string;
  text?: string;
  video?: string;
  videoDesktop?: string;
  num: number;
  bubbles?: IBubble[];
}
