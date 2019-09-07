import React, { useRef, useCallback, useEffect, useState } from 'react';
import { useSprings, animated, useSpring, interpolate } from 'react-spring';
import { useGesture } from 'react-use-gesture';
import { useKeyDown } from 'hooks/use-keydown';

import s from './Slider.scss';

interface IProps {
  children: (item: any, i: number, active: boolean, spring: any) => React.ReactNode;
  items: any[];
  width: number;
  active: number | null;
  visible: number;
}

export default function Slider({ items, width = 700, active, visible = 4, children }: IProps) {
  const [springs, set] = useSprings(items.length, (i: number) => ({
    x: (i < items.length - 1 ? i : -1) * width,
    width,
  }));

  const transform = (x: any) => x.interpolate((x: any) => `translate3d(${x}px,0,0)`);

  const runSprings = useCallback(
    (y) => {
      set((i: number) => {
        return {
          x: active === i ? 0 : -y + width * i,
          width: active === i ? window.innerWidth : width,
          config: {
            tension: active === i ? 300 * i : 200 * i,
            friction: 30 + i * 40,
          },
        };
      });
    },
    [width, active, visible, set, items.length],
  );

  const wheelOffset = useRef(0);
  const dragOffset = useRef(0);

  const bind = useGesture({
    onDrag: ({ local: [x], vxvy: [vx] }) => {
      if (active !== null) {
        return;
      }

      if (vx) {
        dragOffset.current = -x;
      }

      runSprings(wheelOffset.current + -x);
    },
    onWheel: ({ local: [, y], vxvy: [, vy] }) => {
      if (active !== null) {
        return;
      }

      if (vy) {
        wheelOffset.current = y;
      }

      runSprings(dragOffset.current + y);
    },
  });

  useEffect(() => {
    runSprings(wheelOffset.current);
  }, [active]);

  return (
    <div {...bind()} className={s.slider}>
      {springs.map((spring, i) => (
        <animated.div
          key={i}
          className={s(s.slider__item, { [s.slider__itemActive]: i === active })}
          style={{
            width: spring.width,
            transform: transform(spring.x),
          }}
          children={children(items[i], i, active === i, spring.x)}
        />
      ))}
    </div>
  );
}
