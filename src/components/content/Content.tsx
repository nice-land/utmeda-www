import * as React from 'react';

import ReactMarkdown from 'react-markdown';

import s from './Content.scss';

interface IProps {
  title: string;
  source: string;
  titleStyle?: 'normal' | 'bold';
  noPadding?: boolean;
}

export const Content = ({ title, source, titleStyle, noPadding }: IProps) => {
  return (
    <div className={s(s.content__container, { noPadding })}>
      <div className={s.content__row}>
        <div className={s.content__col}>
          <h2 className={s(s.content__title, { bold: titleStyle === 'bold' })}>{title}</h2>
          <div className={s.content__content}>
            <ReactMarkdown source={source} />
          </div>
        </div>
      </div>
    </div>
  );
};
