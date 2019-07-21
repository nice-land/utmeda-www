import * as React from 'react';

import { ScrollWrapper } from 'components/scroll-wrapper/ScrollWrapper';
import { IStep } from 'utils/interfaces';

import { StepsItem } from './StepsItem';

interface IProps {
  list: IStep[];
}

export const Steps = ({ list }: IProps) => {
  return (
    <ScrollWrapper>
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
