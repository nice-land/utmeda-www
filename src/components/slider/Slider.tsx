import React, { useRef, useCallback } from 'react';
import { useSprings, animated } from 'react-spring';
import { useGesture } from 'react-use-gesture';

import s from './Slider.scss';

interface IProps {
  children: (item: any, i: number) => React.ReactNode;
  items: any[];
  width: number;
  visible: number;
}

export default function Slider({
  items,
  width = 700,
  visible = 4,
  children,
}: IProps) {
  const idx = useCallback(
    (x, l = items.length) => (x < 0 ? x + l : x) % l,
    [items],
  );

  const getPos = useCallback(
    (i, firstVis, firstVisIdx) =>
      idx(i - firstVis + firstVisIdx),
    [idx],
  );
  const [springs, set] = useSprings(items.length, (i: number) => ({
    x: (i < items.length - 1 ? i : -1) * width,
  }));
  const transform = (x: any) =>
    x.interpolate((x: any) => `translate3d(${x}px,0,0)`);
  const prev = useRef([0, 1]);

  const runSprings = useCallback(
    (y, vy) => {
      const firstVis = idx(Math.floor(y / width) % items.length);

      const firstVisIdx =
      vy < 0 ? items.length - visible - 1 : 1;

      set(i => {
        const position = getPos(i, firstVis, firstVisIdx);
        const prevPosition = getPos(
          i,
          prev.current[0],
          prev.current[1],
        );
        const rank =
          firstVis -
          (y < 0 ? items.length : 0) +
          position -
          firstVisIdx;
        const configPos =
          vy > 0 ? position : items.length - position;

        return {
          x: (-y % (width * items.length)) + width * rank,
          immediate:
            vy < 0
              ? prevPosition > position
              : prevPosition < position,
          config: {
            tension: (1 + items.length - configPos) * 100,
            friction: 30 + configPos * 40,
          },
        };
      });
      prev.current = [firstVis, firstVisIdx];
    },
    [idx, getPos, width, visible, set, items.length],
  );

  const wheelOffset = useRef(0);
  const dragOffset = useRef(0);
  const bind = useGesture({
    onDrag: ({ local: [x], vxvy: [vx] }) =>
      vx &&
      ((dragOffset.current = -x),
      runSprings(wheelOffset.current + -x, -vx)),
    onWheel: ({ local: [, y], vxvy: [, vy] }) =>
      vy &&
      ((wheelOffset.current = y),
      runSprings(dragOffset.current + y, vy)),
  });

  return (
    <div {...bind()} className={s.slider}>
      {springs.map(({ x }, i) => (
        <animated.div
          key={i}
          className={s.slider__item}
          style={{
            width,
            transform: transform(x),
          }}
          children={children(items[i], i)}
        />
      ))}
    </div>
  );
}
