import * as React from 'react';
import { animated } from 'react-spring';

import { InlineMarkdown } from 'components/inline-markdown/InlineMarkdown';

import s from './Content.scss';

interface IContentProps {
  count: string | number;
  text: string;
  onClick?(): void;
  style?: any;
}

export const Content = React.memo(({ count, text, onClick, style }: IContentProps) => {
  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };

  return (
    <animated.div className={s.content} onClick={handleClick} style={style}>
      <span className={s.content__count}>{count}</span>

      <p className={s.content__link}>
        <InlineMarkdown source={text} />
      </p>
    </animated.div>
  );
});
