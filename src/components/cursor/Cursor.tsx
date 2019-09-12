import React, { useContext, useEffect } from 'react';
import { useSpring, animated as a } from 'react-spring';
import { useMove } from 'react-use-gesture';

import Play from 'assets/svg/play.svg';
import Mouse from 'assets/svg/mouse.svg';

import { useMobile } from 'hooks/use-mobile';
import { AppContext } from 'components/app-layout/AppLayout';

import { Circle } from './Circle';
import s from './Cursor.scss';

export const Cursor = () => {
  const isMobile = useMobile();
  const { cursorText, cursorIcon, isMediaHovered } = useContext(AppContext);

  const [{ xy, hovering }, set] = useSpring(() => ({
    xy: [0, 0],
    hovering: 0,
    config: {
      tension: 210,
      friction: 20,
      mass: 0.5,
    },
  }));

  const bind = useMove((d) => set({ xy: d.xy }), {
    domTarget: typeof window === 'undefined' ? null : window,
  });

  useEffect(bind as any, [bind]);

  useEffect(() => {
    set({ hovering: Number(isMediaHovered) });
  }, [isMediaHovered]);

  const opacity = hovering.interpolate({ range: [0, 1], output: [1, 0] });

  const scale = (output: number[]) =>
    hovering.interpolate({ range: [0, 1], output }).interpolate((r) => `scale(${r})`);

  return (
    <a.div
      className={s(s.cursor, { isMobile })}
      style={{
        transform: xy.interpolate((x: number, y: number) => `translate3d(${x}px,${y}px,0)`),
      }}
    >
      <a.div
        className={s.cursor__inner}
        style={{ opacity }}
      />

      <a.div
        className={s.cursor__stroke}
        style={{
          opacity,
          transform: scale([1, 1.3]),
        }}
      />

      <a.div
        style={{
          opacity: hovering,
          transform: scale([1.2, 1]),
        }}
      >
        <Circle text={cursorText} />
      </a.div>

      <a.div
        className={s.cursor__icon}
        style={{
          opacity: hovering,
          transform: scale([0.8, 1]),
        }}
      >
        {cursorIcon === 'play' && <Play />}
        {cursorIcon === 'mouse' && <Mouse />}
      </a.div>
    </a.div>
  );
};
