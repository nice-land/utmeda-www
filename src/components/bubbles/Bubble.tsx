import * as React from 'react';

import { MessageType } from 'utils/interfaces';

import Browser from 'assets/svg/browser.svg';

import { Call } from './Call';
import { ReplyErase } from './ReplyErase';

import s from './Bubble.scss';

interface IProps {
  type: MessageType;
  msg?: string | { dark: string; light: string };
  scene: 'light' | 'dark';
  seen?: { dark: boolean; light: boolean; };
  theme?: string;
}

export const Bubble = ({ type, msg, scene, seen, theme }: IProps) => {
  const typing = type === 'typing' && !msg;
  const replyErase = type === 'reply-erase';
  const incoming = type === 'incoming' || typing;
  const reply = type === 'reply';

  if (type === 'call') {
    return <Call msg={typeof msg === 'string' ? msg : ''} />;
  }

  if (type === 'browser') {
    return <Browser />;
  }

  const actualMsg = typeof msg === 'string' ? msg : msg && msg[scene];

  const getSubline = (msgType: MessageType, isSeen: undefined | { dark: boolean; light: boolean; }) => {
    if (msgType === 'reply') {
      return 'delivered';
    }

    if (msgType === 'reply-erase') {
      return '';
    }

    if (!isSeen || (isSeen && isSeen[scene])) {
      return 'seen';
    }

    return '';
  };

  const is1717 = theme === '1717';

  return (
    <div className={s(s.bubble, { incoming, typing, is1717 })}>
      <div className={s.bubble__content}>
        <div className={s.bubble__message}>
          {replyErase && (
            <ReplyErase message={actualMsg || ''} />
          )}
          {typing && Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className={s.bubble__dot} />
          ))}
          {(incoming || reply) && actualMsg}
        </div>

        {!typing && (
          <div className={s.bubble__subline}>
            {getSubline(type, seen)}
          </div>
        )}
      </div>
    </div>
  );
};
