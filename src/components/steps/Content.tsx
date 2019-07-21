import * as React from 'react';

import { InlineMarkdown } from 'components/inline-markdown/InlineMarkdown';

import s from './Content.scss';

interface IContentProps {
  count: string | number;
  text: string;
}

export const Content = ({ count, text }: IContentProps) => (
  <div className={s.content}>
    <span className={s.content__count}>{count}</span>

    <span className={s.content__link}>
      <InlineMarkdown source={text} />
    </span>
  </div>
);
