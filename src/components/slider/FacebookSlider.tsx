import React, { useRef, useCallback, useEffect, useState } from 'react';
import { useSprings, animated } from 'react-spring';

import { useKeyDown } from 'hooks/use-keydown';
import { useOrientation } from 'hooks/use-orientation';
import { useViewportWidth } from 'hooks/use-viewport-width';
import { useSlideWidth } from 'hooks/use-slide-width';

import s from './Slider.scss';

interface IProps {
  children: (item: any, i: number, active: boolean, spring: any) => React.ReactNode;
  items: any[];
  width: number;
  immediate?: boolean;
  active: number | null;
  visible: number;
}

const transform = (x: any) => x.interpolate((_x: any) => `translate3d(${_x}px, 0, 0px)`);

export default function Slider({ items, active, visible = 4, children }: IProps) {
  const [hasActive, setHasActive] = useState(false);
  const orientation = useOrientation();
  const viewportWidth = useViewportWidth();
  const width = useSlideWidth();

  const sliderRef = useRef<HTMLDivElement>(null);

  const [springs, set] = useSprings(items.length, (i: number) => ({
    x: i * width,
    width,
    opacity: i === 0 ? 1 : 0,
  }));

  const keys = useKeyDown();
  const offset = useRef(0);

  useEffect(() => {
    runSprings(offset.current);
  }, [width, viewportWidth, orientation]);

  const runSprings = useCallback(
    (y) => {
      set((i: number) => {
        const isFirst = i === 0;
        const firstItemWidth = viewportWidth * 0.75;
        const diff = width - firstItemWidth;
        const immediate = hasActive && active !== i + 1;

        let x;

        if (i === 0) {
          x = -y;
        } else if (i === 1) {
          x = -y + firstItemWidth;
        } else {
          x = -y - diff + width * i;
        }

        return {
          opacity: 1,
          x,
          width: active === i ? viewportWidth : isFirst ? firstItemWidth : width,
          immediate,
          config: {
            tension: active === i ? 300 * i : 100 * i + 50,
            friction: 30 + i * 40,
          },
        };
      });
    },
    [width, active, hasActive, visible, set, viewportWidth, orientation, items.length],
  );

  useEffect(() => {
    if (active) {
      const firstItemWidth = viewportWidth * 0.75;
      const diff = width - firstItemWidth;

      sliderRef.current!.scrollLeft = -diff + width * active;
    } else {
      offset.current = 0;

      setHasActive(false);
    }

    runSprings(offset.current);
  }, [active, runSprings]);

  useEffect(() => {
    if (active) {
      return;
    }

    if (keys.includes(37)) {
      offset.current = Math.max(0, offset.current - width);
      runSprings(offset.current);
    } else if (keys.includes(39) || keys.includes(32)) {
      offset.current = Math.min((items.length - 1) * width, offset.current + width);
      runSprings(offset.current);
    }
  }, [keys, active, runSprings]);

  return (
    <div ref={sliderRef} className={s(s.slider, { active: active !== null })}>
      {springs.map((spring, i) => (
        <animated.div
          key={i}
          className={s(s.slider__item, { [s.slider__itemActive]: i === active })}
          style={{
            opacity: spring.opacity,
            width: spring.width,
            transform: transform(spring.x),
          }}
          tabIndex={i}
          children={children(items[i], i, active === i, spring.x)}
        />
      ))}
    </div>
  );
}
