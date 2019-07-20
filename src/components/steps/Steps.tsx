import * as React from 'react';

import { ScrollWrapper } from 'components/scroll-wrapper/ScrollWrapper';

import { StepsItem } from './StepsItem';

interface IProps {
  list: string[];
}

export const Steps = ({ list }: IProps) => {
  return (
    <ScrollWrapper>
      {list.map((step, i) => (
        <StepsItem
          key={i}
          text={step}
          count={(i + 1).toString().padStart(2, '0')}
          link={`/${i + 1}`}
          media="video"
        />
      ))}
    </ScrollWrapper>
  );
};
