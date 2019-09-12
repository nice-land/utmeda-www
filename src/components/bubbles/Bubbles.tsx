import React, { useState, useEffect } from 'react';
import isEqual from 'lodash/isEqual';
import sortBy from 'lodash/sortBy';
import { useTransition, animated, useSprings } from 'react-spring';
import { IBubble } from 'utils/interfaces';

import { Bubble } from './Bubble';

import s from './Bubbles.scss';

interface IProps {
  bubbles: IBubble[];
  currentTime: number;
  scene: 'light' | 'dark';
  all?: boolean;
}

export const Bubbles = ({ bubbles, currentTime, scene, all = false }: IProps) => {
  // const springs = useSprings(bubbles.length, bubbles.map(_ => ({ y: 20, opacity: 0 })));
  const [springs, setSprings] = useSprings(bubbles.length, (_) => ({ opacity: 0, y: 20, height: 0 }));

  // const [items, setItems] = useState<IBubble[]>([]);

  const visible = bubbles.filter(
    (item) =>
      all || (
        currentTime >= item.timestamp &&
        currentTime <= item.timestamp + item.duration &&
        (item.scene === 'both' || item.scene === scene)
      ),
  );

  const config = {
    mass: 1,
    tension: 170,
    friction: 26,
  };

  // const transitions = useTransition(bubbles, (item: IBubble) => item.key, {
  //   initial: { transform: 'translate3d(0,20px,0)', opacity: 0 },
  //   from: { transform: 'translate3d(0,0,0)', opacity: 0 },
  //   enter: { transform: 'translate3d(0,0,0)', opacity: 1 },
  //   // leave: { transform: 'translate3d(0,-20px,0)', opacity: 0 },
  //   config,
  // });

  useEffect(() => {
    // console.log('-currentTime', currentTime);

    if (!isEqual(sortBy(visible), sortBy(bubbles))) {
      // console.log('-visible', visible);
      // setItems(visible);

      setSprings((index: number) => {
        const isTyping = bubbles[index].type === 'typing';

        // TODO: If typing, remove straight away?
        if (index === visible.length - 1) {
          return { opacity: 1, y: 0, height: 'auto' };
        }
      });
    }
  }, [currentTime]);

  return (
    <div className={s.bubbles}>
      {springs.map((props, index) => {
        // console.log('-props', props);
        // console.log('-index', index);

        // return null;
        const item = bubbles[index];
        const incoming = item.type === 'incoming' || item.type === 'typing' || item.type === 'call';
        const call = item.type === 'call';
        const browser = item.type === 'browser';

        return (
          <animated.div
            key={index}
            style={{
              ...props,
              transform: props.y.interpolate((_y) => `translate3d(0,${_y}px,0)`),
            }}
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
