import * as React from 'react';
import { useSpring, animated } from 'react-spring';
import { useGesture } from 'react-use-gesture';

import Play from 'assets/svg/play.svg';

import { AppContext } from 'components/app-layout/AppLayout';

import { Circle } from './Circle';
import s from './MouseFollow.scss';

const AnimatedCircle = animated(Circle);
const AnimatedPlay = animated(Play);

export const MouseFollow = () => {
  const { mouseText, isMediaHovered } = React.useContext(AppContext);
  const [outer, setOuter] = useSpring(() => ({ xy: [0, 0] }));
  const [inner, setInner] = useSpring(() => ({ xy: [0, 0] }));
  const [propsStroke, setStroke] = useSpring(() => ({ opacity: 1, transform: 'scale(1)' }));
  const [propsText, setText] = useSpring(() => ({ opacity: 0, transform: 'scale(1.3)' }));
  const [propsPlay, setPlay] = useSpring(() => ({ opacity: 0, transform: 'scale(0.2)' }));
  const [propsCircle, setCircle] = useSpring(() => ({ opacity: 1 }));

  const bind = useGesture(
    {
      onMove: ({ _active, _delta, _velocity, direction, xy }) => {
        setOuter({ xy });
        setInner({ xy: direction });
      },
    },
    { domTarget: window },
  );

  React.useEffect(bind, [bind]);

  React.useEffect(() => {
    setStroke({
      opacity: isMediaHovered ? 0 : 1,
      transform: `scale(${isMediaHovered ? 1.3 : 1})`,
    });

    setText({
      opacity: isMediaHovered ? 1 : 0,
      transform: `scale(${isMediaHovered ? 1 : 1.2})`,
    });

    setPlay({
      opacity: isMediaHovered ? 1 : 0,
      transform: `scale(${isMediaHovered ? 1 : 0.8})`,
    });

    setCircle({ opacity: isMediaHovered ? 0 : 1 });
  });

  return (
    <animated.div
      className={s.mouseFollow}
      style={{ transform: outer.xy.interpolate(((x: number, y: number) => `translate3d(${x}px, ${y}px, 0)`) as any) }}
    >
      <animated.div
        className={s.mouseFollow__stroke}
        style={propsStroke}
      />

      <AnimatedCircle
        style={propsText}
        text={mouseText}
      />

      <animated.div
        className={s.mouseFollow__inner}
        style={{
          opacity: propsCircle.opacity,
          transform: inner.xy.interpolate(((x: number, y: number) => `translate3d(${-x * 20}px, ${-y * 20}px, 0)`) as any),
        }}
      />

      <AnimatedPlay
        className={s.mouseFollow__play}
        style={propsPlay}
      />
    </animated.div>
  );
};
