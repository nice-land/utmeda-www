import React from 'react';
import { AnimatedValue, animated as a, interpolate } from 'react-spring';

import s from './ScrollIndicator.scss';

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

const props = (spring: SliderSpring) => ({
  background: interpolate([spring.x, spring.width], (x, width) =>
  margin < x + width && x + width < window.innerWidth - margin ? '#ffffff' : '#303030',
  ),
});

export const ScrollIndicator = ({ springs }: IProps) => (
  <div className={s.scrollIndicator}>
    {springs.map((spring, i) => (
      <a.span key={i} className={s.scrollIndicator__step} style={props(spring)} />
    ))}
  </div>
);
