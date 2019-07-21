import * as React from 'react';

import ReactMarkdown from 'react-markdown';

import s from './Content.scss';

interface IProps {
  title: string;
  source: string;
}

export const Content = ({ title, source }: IProps) => {
  return (
    <div className={s.content__container}>
      <div className={s.content__row}>
        <div className={s.content__col}>
          <h2 className={s.content__title}>{title}</h2>
          <div className={s.content__content}>
            <ReactMarkdown source={source} />
          </div>
        </div>
      </div>
    </div>
  );
};
