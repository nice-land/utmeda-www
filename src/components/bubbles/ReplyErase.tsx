import React, { useState } from 'react';
import { useInterval } from 'hooks/use-interval';

import s from './ReplyErase.scss';

interface IProps {
  message: string;
}

export const ReplyErase = ({ message }: IProps) => {
  const [typed, setTyped] = useState<string[]>([]);
  const [hasReachedEnd, sethasReachedEnd] = useState<boolean>(false);

  const items: string[] = message.split('');

  useInterval(() => {
    if (typed.length < items.length && !hasReachedEnd) {
      const updated = [...typed, items[typed.length]];
      setTyped(updated);
    } else if (hasReachedEnd) {
      const copy = [...typed];
      copy.pop();
      setTyped(copy);
    } else {
      sethasReachedEnd(true);
    }
  }, 800);

  return (
    <>
      {typed.map((letter, i) => (
        <span key={i}>{letter}</span>
      ))}
      <span className={s.replyErase__cursor}>|</span>
    </>
  );
};
