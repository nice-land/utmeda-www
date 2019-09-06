import React, { useContext, useEffect } from 'react';
import { useSpring, animated as a } from 'react-spring';
import { useMove } from 'react-use-gesture';

import Play from 'assets/svg/play.svg';
import Mouse from 'assets/svg/mouse.svg';

import { AppContext } from 'components/app-layout/AppLayout';

import { Circle } from './Circle';
import s from './Cursor.scss';

export const Cursor = () => {
  const { cursorText, cursorIcon, isMediaHovered } = useContext(AppContext);
  const [{ xy, hovering }, set] = useSpring(() => ({ xy: [0, 0], hovering: 0 }));
  const bind = useMove((d) => set({ xy: d.xy }), { domTarget: window });

  useEffect(bind as any, [bind]);

  useEffect(() => {
    set({ hovering: Number(isMediaHovered) });
  }, [isMediaHovered]);

  const opacity = hovering.interpolate({ range: [0, 1], output: [1, 0] });

  return (
    <a.div
      className={s.cursor}
      style={{ transform: xy.interpolate((x: number, y: number) => `translate3D(${x}px, ${y}px, 0)`) }}
    >
      <a.div
        className={s.cursor__inner}
        style={{
          opacity,
        }}
      />
      <a.div
        className={s.cursor__stroke}
        style={{
          opacity,
          transform: hovering
            .interpolate({ range: [0, 1], output: [1, 1.3] })
            .interpolate((r) => `scale(${r})`),
        }}
      />

      <a.div
        style={{
          opacity: hovering,
          transform: hovering
            .interpolate({ range: [0, 1], output: [1.2, 1] })
            .interpolate((r) => `scale(${r})`),
        }}
      >
        <Circle text={cursorText} />
      </a.div>

      <a.div
        className={s.cursor__icon}
        style={{
          opacity: hovering,
          transform: hovering
            .interpolate({ range: [0, 1], output: [0.8, 1] })
            .interpolate((r) => `scale(${r})`),
        }}
      >
        {cursorIcon === 'play' && <Play />}
        {cursorIcon === 'mouse' && <Mouse />}
      </a.div>
    </a.div>
  );
};
