import React, { useContext, useEffect, useRef, useReducer } from 'react';
import { injectIntl } from 'gatsby-plugin-intl';
import { useSpring, animated as a } from 'react-spring';
import Play from 'assets/svg/play.svg';
import Mouse from 'assets/svg/mouse.svg';
import { useKeyDown } from 'hooks/use-keydown';
import { useResize } from 'hooks/use-resize';
import { useOrientation } from 'hooks/use-orientation';
import { Container } from 'components/container/Container';
import { AppContext } from 'components/app-layout/AppLayout';
import { Share } from 'components/share/Share';
import { IBubble } from 'components/bubbles/Bubbles';
import { Video, IVideoRef } from 'components/video/Video';
import { Circle } from 'components/cursor/Circle';

import { Content } from './Content';
import { reducer } from './stepsItemReducer';
import { PostVideo } from './PostVideo';

import s from './StepsItem.scss';

interface IProps {
  intl: any;
  count: string;
  link: string;
  text: string;
  title: string;
  media: string;
  index: number;
  spring: any;
  active: boolean;
  video: string;
  videoDesktop: string;
  next?: {
    num: number;
    title: string;
  };
  onClose(): void;
  onClick(): void;
  bubbles?: IBubble[];
}

// we need to detect whether autoplay is disabled or not
const isPlayable = async (ref: IVideoRef | null): Promise<boolean> => {
  if (ref === null) {
    return false;
  }

  try {
    const time = ref.currentTime;
    await ref.play();
    ref.pause();
    ref.setTime(time);
    return true;
  } catch (e) {
    return false;
  }
};

export const StepsItem = injectIntl(
  ({
    count,
    text,
    title,
    onClose,
    media,
    intl,
    active,
    next,
    onClick,
    video,
    videoDesktop,
    bubbles,
    index,
  }: IProps) => {
    const [state, dispatch] = useReducer(reducer, {
      light: false,
      playState: 'initial',
      showPlayButton: false,
      mouseDown: false,
      mouseMove: false,
      screenX: 0,
      screenY: 0,
    });
    
    const { mouseEnter, mouseLeave } = useContext(AppContext);
    const orientation = useOrientation();
    const [contentProps, setContentProps] = useSpring(() => ({ opacity: 1, pointerEvents: 'all' }));
    const [shareProps, setShareProps] = useSpring(() => ({ opacity: 0, pointerEvents: 'all' }));
    const [mediaProps, setMediaProps] = useSpring(() => ({ opacity: 1 }));
    const isMobile = useResize();
    const keys = useKeyDown();
    const ref = useRef<IVideoRef>(null);

    const videoSrc = isMobile ? video : videoDesktop;

    const handleMouseEnter = () => {
      mouseEnter({
        text: intl.formatMessage({ id: active ? 'step_click' : 'step_watch' }),
        icon: active ? 'mouse' : 'play',
      });
    };

    const handleMouseLeave = () => mouseLeave();

    const setLight = (light: boolean) => dispatch({ type: 'light', light });

    const handlePointerDown = () => setLight(true);

    const handlePointerUp = () => setLight(false);

    const handleClick = (e?: React.MouseEvent) => {
      if (e) {
        e.preventDefault();
      }

      if (!active) {
        onClick();
      } else if (!state.playState === 'ended') {
        dispatch({ type: 'play' });
      }
    };

    const handleMouseUp = () => {
      if (!state.mouseMove) {
        handleClick();
      }
      dispatch({
        type: 'mouseup',
      });
    };

    const handleMouseDown = (e: any) => {
      dispatch({
        type: 'mousedown',
        x: e.screenX,
        y: e.screenY,
      });
    };

    const handleMouseMove = (e: any) => {
      if (state.mouseDown) {
        dispatch({
          type: 'mousemove',
          x: e.screenX,
          y: e.screenY,
        });
      }
    };

    const handleVideoEnd = () => {
      dispatch({
        type: 'end',
      });
    };

    useEffect(() => {
      if (!active || state.playState !== 'playing') {
        return;
      }

      setLight(keys.includes(32));

      if (keys.includes(27)) {
        onClose();
      }
    }, [keys, active, state.playState]);

    const playVideo = () => {
      if (!ref.current) {
        return;
      }

      ref.current.play().catch((err) => {});

      setShareProps({
        opacity: 1,
        delay: 400,
        pointerEvents: 'all',
      });

      setContentProps({
        opacity: 0,
        delay: 200,
        pointerEvents: 'none',
      });
    };

    useEffect(() => {
      if (!ref.current) {
        return;
      }

      if (state.playState === 'playing') {
        setMediaProps({
          opacity: 0,
          delay: 1200,
          onRest: playVideo,
        });
      } else {
        ref.current.pause();
      }
    }, [state.playState]);

    // pause the video when the orientation changes
    useEffect(() => {
      if (!ref.current) {
        return;
      }

      if (orientation === 'portrait') {
        ref.current.pause();
      } else if (ref.current.paused && state.playState !== 'ended') {
        ref.current.play().catch((err) => {});
      }
    }, [state.playState, orientation]);

    const handlePlayPress = () => {
      ref.current!.play();
      dispatch({
        type: 'play',
      });
    };

    useEffect(() => {
      if (!active) {
        setShareProps({
          opacity: 0,
          immediate: true,
          pointerEvents: 'all',
        });

        setContentProps({
          opacity: 1,
          delay: 0,
          pointerEvents: 'all',
        });

        setMediaProps({ opacity: 1, immediate: true });
        dispatch({
          type: 'reset',
        });
      } else {
        isPlayable(ref.current).then((result) => {
          if (result) {
            dispatch({
              type: 'play',
            });
          } else {
            dispatch({
              type: 'autoplay-disabled',
            });
          }
        });
      }
    }, [active]);

    return (
      <div className={s(s.stepsItem, { active, playing: state.playState === 'playing' })}>
        <Container>
          <div
            className={s.stepsItem__wrapper}
            onMouseUp={handleMouseUp}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
          >
            <Content count={count} text={title} style={contentProps} />
            <Share title={title} num={index} style={shareProps} />

            <a.div
              style={mediaProps}
              className={s.stepsItem__media}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <img src={media} alt="" />
            </a.div>

            {active && (
              <Video
                light={state.light}
                bubbles={bubbles}
                onPointerUp={handlePointerUp}
                onPointerDown={handlePointerDown}
                ref={ref}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                src={videoSrc}
                onVideoEnd={handleVideoEnd}
              />
            )}

            <button
              className={s(s.stepsItem__cursor, { visible: isMobile && state.playState === 'playing' })}
              onTouchStart={handlePointerDown}
              onTouchEnd={handlePointerUp}
            >
              <div className={s.stepsItem__cursorCircle}>
                <Circle text={intl.formatMessage({ id: 'step_click' })} />
              </div>

              <Mouse className={s.stepsItem__cursorMouse} />
            </button>

            <button
              className={s(s.stepsItem__cursor, { visible: state.showPlayButton && state.playState !== 'playing' })}
              onClick={handlePlayPress}
            >
              <div className={s.stepsItem__cursorCircle}>
                <Circle text={intl.formatMessage({ id: 'step_watch' })} />
              </div>

              <Play className={s.stepsItem__cursorPlay} />
            </button>

            <PostVideo
              visible={active && state.playState === 'ended'}
              nextNum={next && next.num}
              nextTitle={next && next.title}
              text={text}
            />
          </div>
        </Container>
      </div>
    );
  },
);
