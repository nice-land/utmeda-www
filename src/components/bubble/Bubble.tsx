import * as React from 'react';

import s from './Bubble.scss';

interface IProps {
  type: 'incoming' | 'reply' | 'typing' | 'call';
  msg: string;
}

export const Bubble = ({ type, msg }: IProps) => {
  const incoming = type === 'incoming';

  return (
    <div className={s(s.bubble, { incoming })}>
      <div className={s.bubble__content}>
        <div className={s.bubble__message}>{msg}</div>
        <div className={s.bubble__subline}>
          {incoming ? 'seen' : 'delivered'}
        </div>
      </div>

    </div>
  );
};
