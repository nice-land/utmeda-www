import * as React from 'react';
import { useSpring, animated } from 'react-spring';
import { useGesture } from 'react-use-gesture';
import { TweenLite } from 'gsap';

import Play from 'assets/svg/play.svg';

import { AppContext } from 'components/app-layout/AppLayout';

import { Circle } from './Circle';
import s from './MouseFollow.scss';

const AnimatedCircle = animated(Circle);
const AnimatedPlay = animated(Play);

// export const MouseFollow = () => {
export class MouseFollow extends React.PureComponent {

  static contextType = AppContext;

  cursorRef: React.RefObject<HTMLDivElement> = React.createRef();
  circleRef: React.RefObject<HTMLDivElement> = React.createRef();
  strokeRef: React.RefObject<HTMLDivElement> = React.createRef();
  dotTopRef: React.RefObject<HTMLDivElement> = React.createRef();
  dotBottomRef: React.RefObject<HTMLDivElement> = React.createRef();
  traceRef: React.RefObject<HTMLDivElement> = React.createRef();
  parentRef: React.RefObject<HTMLDivElement> = React.createRef();
  pressCache: any;
  linksCache: any;
  mouseDownActive = false;
  mouseTimestamp = 0;
  mouse = 0;

  state = {
    isPhotoOpen: false,
    isTouchable: false,
  };

  componentDidMount() {
    this.onInit();

    window.addEventListener('mousedown', this.handleMouseDown);
    window.addEventListener('mousemove', this.handleMouseMove);
    window.addEventListener('mouseup', this.handleMouseUp);
  }

  componentWillReceiveProps(nextProps) {
      // React.useEffect(() => {
  //   setStroke({
  //     opacity: isMediaHovered ? 0 : 1,
  //     transform: `scale(${isMediaHovered ? 1.3 : 1})`,
  //   });

  //   setText({
  //     opacity: isMediaHovered ? 1 : 0,
  //     transform: `scale(${isMediaHovered ? 1 : 1.2})`,
  //   });

  //   setPlay({
  //     opacity: isMediaHovered ? 1 : 0,
  //     transform: `scale(${isMediaHovered ? 1 : 0.8})`,
  //   });

  //   setCircle({ opacity: isMediaHovered ? 0 : 1 });
  // });

  }

  componentWillUnmount() {
    window.removeEventListener('mousedown', this.handleMouseDown);
    window.removeEventListener('mousemove', this.handleMouseMove);
    window.removeEventListener('mouseup', this.handleMouseUp);
  }

  onInit = () => {
    this.setState({ isTouchable: 'ontouchstart' in document.documentElement });
  }

  handleMouseMove = (e: MouseEvent) => {
    if (
      !this.cursorRef.current ||
      !this.strokeRef.current
    ) {
      return;
    }

    TweenLite.to(
      this.cursorRef.current,
      0.25,
      {
        x: e.pageX,
        y: e.pageY,
      },
    );
  }

  handleMouseSpeed = (e: MouseEvent) => {
    const now = Date.now();
    const currentMouse = e.pageX;
    const dt = now - this.mouseTimestamp;
    const distance = Math.abs(currentMouse - this.mouse);
    const speed = Math.round(distance / dt * 1000);

    this.mouse = currentMouse;
    this.mouseTimestamp = now;

    return speed;
  }

  handleMouseDown = () => {
    this.mouseDownActive = true;
    // this.press.play();
  }

  handleMouseUp = () => {
    this.mouseDownActive = false;
    // this.press.reverse();

    if (!this.parentRef.current) {
      return;
    }
  }

  // get press() {
  //   if (this.pressCache) {
  //     return this.pressCache;
  //   }

  //   const timeline = new TimelineLite();

  //   if (
  //     !this.circleRef.current ||
  //     !this.traceRef.current ||
  //     !this.dotTopRef.current ||
  //     !this.dotBottomRef.current ||
  //     !this.parentRef.current
  //   ) {
  //     return timeline;
  //   }

  //   const title = this.parentRef.current.querySelectorAll('#scroll-content > figure h3');
  //   const caption = this.parentRef.current.querySelectorAll('#scroll-content > figure figcaption');

  //   timeline.addLabel('start', 0);

  //   timeline.set(
  //     this.traceRef.current,
  //     { opacity: 0 },
  //   );

  //   timeline.fromTo(
  //     this.circleRef.current,
  //     0.65,
  //     {
  //       width: SIZE,
  //       height: SIZE,
  //       scale: 1,
  //       backgroundColor: '#fff',
  //       borderColor: 'transparent',
  //     },
  //     {
  //       width: 28,
  //       height: 28,
  //       backgroundColor: 'transparent',
  //       borderColor: '#fff',
  //       ease: Power4.easeInOut,
  //     },
  //     'start',
  //   );

  //   timeline.to(
  //     this.dotTopRef.current,
  //     0.55,
  //     {
  //       opacity: 1,
  //       x: -26,
  //       ease: Power4.easeInOut,
  //     },
  //     'start',
  //   );

  //   timeline.to(
  //     this.dotBottomRef.current,
  //     0.55,
  //     {
  //       opacity: 1,
  //       x: 26,
  //       ease: Power4.easeInOut,
  //     },
  //     'start',
  //   );

  //   timeline.staggerTo(
  //     [title, caption],
  //     0.65,
  //     {
  //       opacity: 0,
  //       ease: Power4.easeInOut,
  //     },
  //     0,
  //     'start',
  //   );

  //   this.pressCache = timeline;
  //   return timeline;
  // }

  // const { mouseText, isMediaHovered } = React.useContext(AppContext);
  // const [outer, setOuter] = useSpring(() => ({ xy: [0, 0] }));
  // const [inner, setInner] = useSpring(() => ({ xy: [0, 0] }));
  // const [propsStroke, setStroke] = useSpring(() => ({ opacity: 1, transform: 'scale(1)' }));
  // const [propsText, setText] = useSpring(() => ({ opacity: 0, transform: 'scale(1.3)' }));
  // const [propsPlay, setPlay] = useSpring(() => ({ opacity: 0, transform: 'scale(0.2)' }));
  // const [propsCircle, setCircle] = useSpring(() => ({ opacity: 1 }));

  // const bind = useGesture(
  //   {
  //     onMove: ({ _active, _delta, _velocity, direction, xy }) => {
  //       setOuter({ xy });
  //       setInner({ xy: direction });
  //     },
  //   },
  //   { domTarget: typeof window !== 'undefined' ? window : null },
  // );

  // React.useEffect(() => {
  //   bind();
  // }, [bind]);

  // React.useEffect(() => {
  //   setStroke({
  //     opacity: isMediaHovered ? 0 : 1,
  //     transform: `scale(${isMediaHovered ? 1.3 : 1})`,
  //   });

  //   setText({
  //     opacity: isMediaHovered ? 1 : 0,
  //     transform: `scale(${isMediaHovered ? 1 : 1.2})`,
  //   });

  //   setPlay({
  //     opacity: isMediaHovered ? 1 : 0,
  //     transform: `scale(${isMediaHovered ? 1 : 0.8})`,
  //   });

  //   setCircle({ opacity: isMediaHovered ? 0 : 1 });
  // });

  render() {
    return (
      <>
        <div
          ref={this.cursorRef}
          className={s.mouseFollow}
        >
          <div
            ref={this.circleRef}
            className={s.mouseFollow__circle}
          />

          <div
            ref={this.strokeRef}
            className={s.mouseFollow__stroke}
          />
        </div>
      </>
    );

    // return (
    //   <animated.div
    //     className={s.mouseFollow}
    //     style={{ transform: outer.xy.interpolate(((x: number, y: number) => `translate3d(${x}px, ${y}px, 0)`) as any) }}
    //   >
    //     <animated.div
    //       className={s.mouseFollow__stroke}
    //       style={propsStroke}
    //     />

    //     <AnimatedCircle
    //       style={propsText}
    //       text={mouseText}
    //     />

    //     <animated.div
    //       className={s.mouseFollow__inner}
    //       style={{
    //         opacity: propsCircle.opacity,
    //         transform: inner.xy.interpolate(((x: number, y: number) => `translate3d(${-x * 20}px, ${-y * 20}px, 0)`) as any),
    //       }}
    //     />

    //     <AnimatedPlay
    //       className={s.mouseFollow__play}
    //       style={propsPlay}
    //     />
    //   </animated.div>
    // );
  }
}
