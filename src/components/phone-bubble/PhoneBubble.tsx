import * as React from 'react';

import Bubble from 'assets/svg/phone-bubble.svg';

import s from './PhoneBubble.scss';

interface IPhoneBubbleProps {
  url: string;
}

export const PhoneBubble = ({ url }: IPhoneBubbleProps) => (
  <a
    className={s.phoneBubble}
    href={url}
    target="_blank"
    rel="noopener noreferrer"
  >
    <Bubble />
  </a>
);
