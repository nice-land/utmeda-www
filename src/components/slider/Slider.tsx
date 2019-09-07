import React, { useRef, useCallback, useEffect, useState } from "react";
import { useSprings, animated, useSpring, interpolate } from "react-spring";
import { useGesture } from "react-use-gesture";

import s from "./Slider.scss";
import { useKeyDown } from "hooks/use-keydown";

interface IProps {
  children: (
    item: any,
    i: number,
    active: boolean,
    spring: any
  ) => React.ReactNode;
  items: any[];
  width: number;
  active: number | null;
  visible: number;
}

export default function Slider({
  items,
  width = 700,
  active,
  visible = 4,
  children
}: IProps) {
  const [springs, set] = useSprings(items.length, (i: number) => ({
    x: i * width,
    width
  }));
  const keys = useKeyDown();

  const transform = (x: any) =>
    x.interpolate((x: any) => `translate3d(${x}px,0,0)`);

  const runSprings = useCallback(
    y => {
      set((i: number) => {
        return {
          x: active === i ? 0 : -y + width * i,
          width: active === i ? window.innerWidth : width,
          config: {
            tension: active === i ? 300 * i : 50 * i + 50,
            friction: 30 + i * 40
          }
        };
      });
    },
    [width, active, visible, set, items.length]
  );

  const offset = useRef(0);

  const bind = useGesture({
    onDrag: ({ vxvy: [x] }) => {
      if (active !== null) {
        return;
      }
        
      offset.current -= x * 20;

      runSprings(offset.current);
    },
    onWheel: ({ delta: [, vy] }) => {
      if (active !== null) {
        return;
      }

      offset.current += vy;

      runSprings(offset.current);
    }
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
      offset.current = Math.min(
        (items.length - 1) * width,
        offset.current + width
      );
    }
    console.log(offset.current);

    runSprings(offset.current);
  }, [keys, active, runSprings]);

  return (
    <div {...bind()} className={s.slider}>
      {springs.map((spring, i) => (
        <animated.div
          key={i}
          className={s(s.slider__item, {
            [s.slider__itemActive]: i === active
          })}
          style={{
            width: spring.width,
            transform: transform(spring.x)
          }}
          children={children(items[i], i, active === i, spring.x)}
        />
      ))}
    </div>
  );
}
