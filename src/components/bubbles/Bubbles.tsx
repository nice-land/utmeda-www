import * as React from 'react';
import isEqual from 'lodash/isEqual';
import sortBy from 'lodash/sortBy';
import { useTransition, animated } from 'react-spring';
import { IBubble } from 'utils/interfaces';

import { Bubble } from './Bubble';

import s from './Bubbles.scss';

interface IProps {
  bubbles: IBubble[];
  currentTime: number;
  scene: 'light' | 'dark';
  all?: boolean;
  videoIndex: number;
}

export const Bubbles = ({ bubbles, currentTime, scene, all = false, videoIndex }: IProps) => {
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
    initial: { transform: `translate3d(0,20px,0)`, opacity: 0, height: 0 },
    from: { transform: `translate3d(0,20px,0)`, opacity: 0, height: 0 },
    enter: { transform: `translate3d(0,0,0)`, opacity: 1, height: 'auto' },
    leave: { transform: `translate3d(0,-20px,0)`, opacity: 0, height: 0 },
    config,
  });

  const video4 = videoIndex === 4;
  const video5 = videoIndex === 5;
  const video10 = videoIndex === 10;

  return (
    <div className={s(s.bubbles, { video4, video5, video10 })}>
      {transitions.map(({ key, item, props }) => {
        const incoming = item.type === 'incoming' || item.type === 'typing' || item.type === 'call';
        const call = item.type === 'call';
        const browser = item.type === 'browser';

        return (
          <animated.div
            key={key}
            style={props}
            className={s(s.bubbles__bubble, { incoming, call, browser })}
          >
            <Bubble
              type={item.type}
              msg={item.msg}
              seen={item.seen}
              theme={item.theme}
              scene={scene}
            />
          </animated.div>
        );
      })}
    </div>
  );
};
