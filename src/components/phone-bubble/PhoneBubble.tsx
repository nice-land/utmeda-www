import * as React from 'react';

import Bubble from 'assets/svg/phone-bubble.svg';

import s from './PhoneBubble.scss';

interface IPhoneBubbleProps {
  url: string;
  position?: 'relative' | 'fixed';
}

export const PhoneBubble = ({ url, position }: IPhoneBubbleProps) => (
  <a
    className={s(s.phoneBubble, position)}
    href={url}
    target="_blank"
    rel="noopener noreferrer"
  >
    <Bubble />
  </a>
);

PhoneBubble.defaultProps = {
  position: 'fixed',
};
