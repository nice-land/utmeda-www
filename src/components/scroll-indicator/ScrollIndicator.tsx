import React from 'react';
import { AnimatedValue, animated as a, interpolate } from 'react-spring';

import s from './ScrollIndicator.scss';
import { useViewportWidth } from 'hooks/use-viewport-width';

type SliderSpring = AnimatedValue<
  Pick<
    {
      x: number;
      width: number;
      opacity: number;
    },
    'width' | 'x' | 'opacity'
  >
>;

interface IProps {
  springs: SliderSpring[];
}

const margin = 80;

const props = (spring: SliderSpring, viewportWidth: number) => ({
  background: interpolate([spring.x, spring.width], (x, width) =>
    margin < x + width && x + width < viewportWidth - margin ? '#ffffff' : '#303030',
  ),
});

export const ScrollIndicator = ({ springs }: IProps) => {
  const viewportWidth = useViewportWidth();

  return (
    <div className={s.scrollIndicator}>
      {springs.map((spring, i) => (
        <a.span key={i} className={s.scrollIndicator__step} style={props(spring, viewportWidth)} />
      ))}
    </div>
  );
};
