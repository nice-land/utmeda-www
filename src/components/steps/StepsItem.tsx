import { injectIntl, Link } from 'gatsby-plugin-intl';
import { Container } from 'components/container/Container';
import React, { useState, useContext, useEffect, useRef } from 'react';
import { AppContext } from 'components/app-layout/AppLayout';
import { useSpring, animated as a } from 'react-spring';
import { Share } from 'components/share/Share';
import { IBubble } from 'components/bubbles/Bubbles';
import { Video, IVideoRef } from 'components/video/Video';
import { useKeyDown } from 'hooks/use-keydown';

import { Content } from './Content';
import { PostVideo } from './PostVideo';

import s from './StepsItem.scss';
import { useOrientation } from 'hooks/use-orientation';

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
    await ref.play();
    console.log('IS PLAYABLE');
    ref.pause();
    ref.setTime(0);
    return true;
  } catch (e) {
    console.log('IS NOT PLAYABLE');
    return false;
  }
};

export const StepsItem = injectIntl(
  ({
    count,
    link,
    text,
    title,
    onClose,
    media,
    intl,
    active,
    next,
    onClick,
    video,
    bubbles,
    index,
  }: IProps) => {
    const { mouseEnter, mouseLeave } = useContext(AppContext);
    const [playing, setPlaying] = useState(false);
    const [light, setLight] = useState(false);
    const orientation = useOrientation();
    const [showPlayButton, setShowPlayButton] = useState(false);
    const [videoEnded, setVideoEnded] = useState(false);
    const [contentProps, setContentProps] = useSpring(() => ({ opacity: 1, pointerEvents: 'all' }));
    const [shareProps, setShareProps] = useSpring(() => ({ opacity: 0, pointerEvents: 'all' }));
    const [mediaProps, setMediaProps] = useSpring(() => ({ opacity: 1 }));

    const keys = useKeyDown();
    const ref = useRef<IVideoRef>(null);

    const handleMouseEnter = () => {
      mouseEnter({
        text: intl.formatMessage({ id: active ? 'step_click' : 'step_watch' }),
        icon: active ? 'mouse' : 'play',
      });
    };

    const handleMouseLeave = () => {
      mouseLeave();
    };

    const handlePointerDown = () => setLight(true);

    const handlePointerUp = () => setLight(false);

    const handleClick = (e?: React.MouseEvent) => {
      if (e) {
        e.preventDefault();
      }

      if (!active) {
        onClick();
      } else {
        setPlaying(true);
      }
    };

    const handleVideoEnd = () => {
      setPlaying(false);

      setVideoEnded(true);
    };

    useEffect(() => {
      if (!active || !playing) {
        return;
      }

      setLight(keys.includes(32));

      if (keys.includes(27)) {
        onClose();
      }
    }, [keys, active, playing]);

    const playVideo = () => {
      if (!ref.current) {
        return;
      }

      ref.current.play().catch(() => {
        setShowPlayButton(true);
      });

      setShareProps({
        opacity: 1,
        delay: 3000,
        pointerEvents: 'all',
      });

      setContentProps({
        opacity: 0,
        delay: 3000,
        pointerEvents: 'none',
      });
    };

    useEffect(() => {
      if (!ref.current) {
        return;
      }

      if (playing) {
        setMediaProps({
          opacity: 0,
          delay: 1250,
          onRest: playVideo,
        });
      } else if (!playing) {
        ref.current.pause();
      }
    }, [playing]);

    useEffect(() => {
      if (!ref.current) {
        return;
      }

      if (orientation === 'portrait') {
        ref.current.pause();
      } else if (ref.current.paused && !videoEnded) {
        ref.current.play();
      }
    }, [orientation]);

    const handlePlayPress = () => {
      setPlaying(true);
      setShowPlayButton(false);
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
        setVideoEnded(false);
        setPlaying(false);
      } else {
        isPlayable(ref.current).then((result) => {
          if (result) {
            setPlaying(true);
          } else {
            setShowPlayButton(true);
          }
        });
      }
    }, [active]);

    return (
      <div className={s(s.stepsItem, { active, playing })}>
        <Container>
          <div className={s.stepsItem__wrapper} onClick={handleClick}>
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
                light={light}
                bubbles={bubbles}
                onPointerUp={handlePointerUp}
                onPointerDown={handlePointerDown}
                ref={ref}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                src={video}
                onVideoEnd={handleVideoEnd}
              />
            )}
            {showPlayButton && (
              <button
                className={s.stepsItem__play}
                onClick={() => {
                  ref.current.play();
                  handlePlayPress();
                }}
              >
                Spila
              </button>
            )}
            <PostVideo
              visible={active && videoEnded}
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
