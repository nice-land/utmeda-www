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
  num: number;
}
