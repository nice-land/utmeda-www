import * as React from 'react';
import isEqual from 'lodash/isEqual';
import sortBy from 'lodash/sortBy';
import { useTransition, animated } from 'react-spring';

import { Bubble } from '../bubble/Bubble';

import s from './Bubbles.scss';

export interface IBubble {
  key: string;
  scene: 'both' | 'light' | 'dark';
  timestamp: number;
  duration: number;
  type: 'incoming' | 'reply' | 'typing' | 'call';
  msg?: string;
}

interface IProps {
  bubbles: IBubble[];
  currentTime: number;
  scene: 'both' | 'light' | 'dark';
  all?: boolean;
}

export const Bubbles = ({ bubbles, currentTime, scene, all = false }: IProps) => {
  const [items, setItems] = React.useState<IBubble[]>([]);

  const visible = bubbles.filter(
    (item) =>
      all || (
        currentTime >= item.timestamp &&
        currentTime <= item.timestamp + item.duration &&
        (item.scene === 'both' || item.scene === scene)
      ),
  );

  if (!isEqual(sortBy(visible), sortBy(items))) {
    setItems(visible);
  }

  const config = {
    mass: 1,
    tension: 170,
    friction: 26,
  };

  const transitions = useTransition(items, (item: IBubble) => item.key, {
    initial: { opacity: 1 },
    from: { opacity: 1 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    config,
  });

  return (
    <div className={s.bubbles}>
      {transitions.map(({ key, item, props }) => {
        const incoming = item.type === 'incoming' || item.type === 'typing' || item.type === 'call';
        const call = item.type === 'call';

        return (
          <animated.div
            key={key}
            style={props}
            className={s(s.bubbles__bubble, { incoming, call })}
          >
            <Bubble
              type={item.type}
              msg={item.msg}
            />
          </animated.div>
        );
      })}
    </div>
  );
};
