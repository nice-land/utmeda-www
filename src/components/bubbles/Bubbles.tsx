import * as React from 'react';

import s from './Bubbles.scss';

export interface IBubble {
  scene: 'both' | 'light' | 'dark';
  timestamp: number;
  duration: number;
  type: 'incoming' | 'reply';
  msg: string;
}

interface IProps {
  bubbles: IBubble[];
  currentTime: number;
  scene: 'both' | 'light' | 'dark';
}

export const Bubbles = ({ bubbles, currentTime, scene }: IProps) => (
  <div className={s.bubbles}>
    {bubbles.length}
    {currentTime}
    {scene}
  </div>
);
