import React, { useRef, useCallback, useEffect } from 'react';
import { useSprings, animated, interpolate } from 'react-spring';
import { useGesture } from 'react-use-gesture';
import { useKeyDown } from 'hooks/use-keydown';
import { usePrevious } from 'hooks/use-previous';
import { clamp } from 'lodash';
import { useOrientation } from 'hooks/use-orientation';
import { FullGestureState, Coordinates as Coords } from 'react-use-gesture/dist/types';

import s from './Slider.scss';

interface IProps {
  children: (item: any, i: number, active: boolean, spring: any) => React.ReactNode;
  items: any[];
  width: number;
  immediate?: boolean;
  active: number | null;
  visible: number;
}

const transform = (x: any, width: number, active: boolean) =>
  interpolate(
    [
      x.interpolate((_x: any) => `translate3d(${_x}px,0,${active ? 0 : -100}px) `),
      x
        .interpolate({
          range: [-width, 0, width],
          output: [-5.0, 0, 5.0],
        })
        .interpolate((_x: any) => `rotate3d(0, 1, 0, ${_x}deg)`),
      x
        .interpolate({
          range: [-width, 0, width],
          output: [1.0, active ? 1.0 : 1.1, 1.0],
        })
        .interpolate((_x: any) => `scale3d(${_x}, ${_x}, 1)`),
    ],
    (translate, rotate, scale) => `${translate} ${rotate} ${scale}`,
  );

export default function Slider({ items, width = 700, active, visible = 4, children }: IProps) {
  const orientation = useOrientation();
  const previous = usePrevious(orientation);
  const [springs, set] = useSprings(items.length, (i: number) => ({
    x: i * width,
    width,
  }));
  const keys = useKeyDown();
  const offset = useRef(0);

  const runSprings = useCallback(
    (y) => {
      set((i: number) => {
        return {
          x: active === i ? 0 : -y + width * i,
          width: active === i ? window.innerWidth : width,
          immediate: previous && orientation !== previous,
          config: {
            tension: active === i ? 300 * i : 100 * i + 50,
            friction: 30 + i * 40,
          },
        };
      });
    },
    [width, active, visible, set, orientation, items.length],
  );

  type GestureSelector = (h: FullGestureState<Coords>) => [number, number];

  const handleGesture = (
    selector: GestureSelector,
    boost: [number, number?] = [1, -1],
  ) => (h: FullGestureState<Coords>) => {
    if (active !== null) {
      return;
    }
    const [currentX, previousX] = selector(h);

    const [boostCurrent, boostPrev = boostCurrent] = boost;

    offset!.current = clamp(
      offset!.current + currentX * boostCurrent + previousX * boostPrev,
      0,
      width * (items.length - 1),
    );

    runSprings(offset!.current);

    return offset!.current;
  };

  const bind = useGesture({
    onDrag: handleGesture(({ xy: [cx], previous: [px] }) => [cx, px], [-5, 5]),
    onWheel: handleGesture(({ xy: [, cy], previous: [, py] }) => [cy, py]),
  });

  useEffect(() => {
    if (active) {
      offset.current = width * active;
    }

    runSprings(offset.current);
  }, [active, runSprings]);

  useEffect(() => {
    if (active) {
      return;
    }

    if (keys.includes(37)) {
      offset.current = Math.max(0, offset.current - width);
    } else if (keys.includes(39) || keys.includes(32)) {
      offset.current = Math.min((items.length - 1) * width, offset.current + width);
    }

    runSprings(offset.current);
  }, [keys, active, runSprings]);

  return (
    <div {...bind()} className={s.slider}>
      {springs.map((spring, i) => (
        <animated.div
          key={i}
          className={s(s.slider__item, {
            [s.slider__itemActive]: i === active,
          })}
          style={{
            width: spring.width,
            transform: transform(spring.x, width, active === i),
          }}
          children={children(items[i], i, active === i, spring.x)}
        />
      ))}
    </div>
  );
}
