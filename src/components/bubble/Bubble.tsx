import * as React from 'react';

import { Call } from './Call';
import s from './Bubble.scss';

interface IProps {
  type: 'incoming' | 'reply' | 'typing' | 'call';
  msg?: string;
}

export const Bubble = ({ type, msg }: IProps) => {
  const typing = type === 'typing' && !msg;
  const incoming = type === 'incoming' || typing;

  if (type === 'call') {
    return <Call msg={msg} />;
  }

  return (
    <div className={s(s.bubble, { incoming, typing })}>
      <div className={s.bubble__content}>
        <div className={s.bubble__message}>
          {typing ? Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className={s.bubble__dot} />
          )) : msg}
        </div>

        {!typing && (
          <div className={s.bubble__subline}>
            {incoming ? 'seen' : 'delivered'}
          </div>
        )}
      </div>
    </div>
  );
};
