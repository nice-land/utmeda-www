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
  immediate?: boolean;
  active: number | null;
  visible: number;
}

const transform = (x: any, width: number, active: boolean) =>
  interpolate(
    [
      x.interpolate((x: any) => `translate3d(${x}px,0,0) `),
      x
        .interpolate({
          range: [-width, 0, width],
          output: [-5.0, 0, 5.0]
        })
        .interpolate((x: any) => `rotate3d(0, 1, 0, ${x}deg)`),
      x
        .interpolate({
          range: [-width, 0, width],
          output: [1.0, active ? 1.0 : 1.1, 1.0]
        })
        .interpolate((x: any) => `scale3d(${x}, ${x}, 1)`)
    ],
    (translate, rotate, scale) => `${translate} ${rotate} ${scale}`
  );

export default function Slider({
  items,
  width = 700,
  active,
  visible = 4,
  children
}: IProps) {
  // if (typeof window === "undefined") {
  //   return null;
  // }

  const [springs, set] = useSprings(items.length, (i: number) => ({
    x: i * width,
    width
  }));
  const keys = useKeyDown();

  const runSprings = useCallback(
    y => {
      set((i: number) => {
        return {
          x: active === i ? 0 : -y + width * i,
          width: active === i ? window.innerWidth : width,
          config: {
            tension: active === i ? 300 * i : 100 * i + 50,
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
            transform: transform(spring.x, width, active === 1)
          }}
          children={children(items[i], i, active === i, spring.x)}
        />
      ))}
    </div>
  );
}
