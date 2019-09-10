import { IBubble } from 'components/bubbles/Bubbles';

export interface IIntlProps {
  languages: string[];
  language: string;
  messages: {[key: string]: string};
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
