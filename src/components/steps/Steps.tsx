import * as React from 'react';

import { ScrollWrapper } from 'components/scroll-wrapper/ScrollWrapper';
import { IStep } from 'utils/interfaces';

import { StepsItem } from './StepsItem';

import s from './Steps.scss';

interface IProps {
  title: string;
  list: IStep[];
}

export const Steps = ({ title, list }: IProps) => {
  return (
    <ScrollWrapper snap>
      {/* <div className={s.steps__title}>
        <h1 className={s.steps__titleContent}>{title}</h1>
      </div> */}
      {list.map((step, i) => (
        <StepsItem
          key={i}
          index={i}
          text={step.title}
          count={(i + 1).toString().padStart(2, '0')}
          link={`/${i + 1}`}
          media={step.poster}
        />
      ))}
    </ScrollWrapper>
  );
};
