import * as React from 'react';
import { TweenLite, TimelineLite, Power4 } from 'gsap';

import Play from 'assets/svg/play.svg';

import { AppContext } from 'components/app-layout/AppLayout';

import { Circle } from './Circle';
import s from './Cursor.scss';

interface ICursorComponentProps {
  context: any;
}

class CursorComponent extends React.PureComponent<ICursorComponentProps> {

  static contextType = AppContext;

  cursorRef: React.RefObject<HTMLDivElement> = React.createRef();
  innerRef: React.RefObject<HTMLDivElement> = React.createRef();
  strokeRef: React.RefObject<HTMLDivElement> = React.createRef();
  svgCircleRef: React.RefObject<HTMLDivElement> = React.createRef();
  svgPlayRef: React.RefObject<HTMLDivElement> = React.createRef();
  overCache: any;
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

  componentWillReceiveProps(nextProps: ICursorComponentProps) {
    if (nextProps.context.isMediaHovered) {
      this.handleMouseOver.play();
    } else {
      this.handleMouseOver.reverse();
    }
  }

  componentWillUnmount() {
    window.removeEventListener('mousedown', this.handleMouseDown);
    window.removeEventListener('mousemove', this.handleMouseMove);
    window.removeEventListener('mouseup', this.handleMouseUp);
  }

  get handleMouseOver() {
    if (this.overCache) {
      return this.overCache;
    }

    const stroke = this.strokeRef.current;
    const circle = this.svgCircleRef.current;
    const play = this.svgPlayRef.current;
    const inner = this.innerRef.current;
    const timeline = new TimelineLite();
    const ease = Power4.easeInOut;

    if (!stroke || !circle || !inner || !play) {
      return;
    }

    timeline.addLabel('start', 0);

    timeline.fromTo(
      stroke,
      0.6,
      {
        opacity: 1,
        scale: 1,
      },
      {
        opacity: 0,
        scale: 1.3,
        ease,
      },
    );

    timeline.fromTo(
      circle,
      0.6,
      {
        opacity: 0,
        scale: 1.2,
      },
      {
        opacity: 1,
        scale: 1,
        ease,
      },
      'start',
    );

    timeline.fromTo(
      inner,
      0.6,
      {
        opacity: 1,
      },
      {
        opacity: 0,
        ease,
      },
      'start',
    );

    timeline.fromTo(
      play,
      0.6,
      {
        opacity: 0,
        scale: 0.8,
      },
      {
        opacity: 1,
        scale: 1,
        ease,
      },
      'start',
    );

    this.overCache = timeline;
    return timeline;
  }

  onInit = () => {
    this.setState({ isTouchable: 'ontouchstart' in document.documentElement });
  }

  handleMouseMove = (e: MouseEvent) => {
    const cursor = this.cursorRef.current;

    if (!cursor) {
      return;
    }

    TweenLite.to(
      cursor,
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
  }

  handleMouseUp = () => {
    this.mouseDownActive = false;
  }

  render() {
    const { mouseText } = this.props.context;

    return (
      <div
        ref={this.cursorRef}
        className={s.cursor}
      >
        <div
          ref={this.innerRef}
          className={s.cursor__inner}
        />

        <div
          ref={this.strokeRef}
          className={s.cursor__stroke}
        />

        <div ref={this.svgCircleRef}>
          <Circle text={mouseText} />
        </div>

        <div
          ref={this.svgPlayRef}
          className={s.cursor__play}
        >
          <Play />
        </div>
      </div>
    );
  }
}

const withContext = (Component: any) => {
  return (props: any) => (
    <AppContext.Consumer>
      {(context: any) => {
        return <Component {...props} context={context} />;
      }}
    </AppContext.Consumer>
  );
};

export const Cursor = withContext(CursorComponent);
