import { injectIntl, Link } from 'gatsby-plugin-intl';
import { Container } from 'components/container/Container';
import React, { useState, useContext, useEffect, useRef } from 'react';
import { AppContext } from 'components/app-layout/AppLayout';
import { useSpring } from 'react-spring';
import { Share } from 'components/share/Share';
import { IBubble } from 'components/bubbles/Bubbles';
import { Video, IVideoRef } from 'components/video/Video';

import { Content } from './Content';
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
  next?: {
    num: number;
    title: string;
  };
  onClose(): void;
  onClick(): void;
  bubbles?: IBubble[];
}

export const StepsItem = injectIntl(
  ({ count, link, text, title, media, intl, active, next, onClick, video, bubbles, index }: IProps) => {
    const { mouseEnter, mouseLeave } = useContext(AppContext);
    const [playing, setPlaying] = useState(false);
    const [videoEnded, setVideoEnded] = useState(false);
    const [contentProps, setContentProps] = useSpring(() => ({ opacity: 1, pointerEvents: 'all' }));
    const [shareProps, setShareProps] = useSpring(() => ({ opacity: 0, pointerEvents: 'all' }));

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

    const handleCanPlay = () => {
      setPlaying(true);
    };

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
      if (!ref.current) {
        return;
      }

      if (playing) {
        try {
          ref.current.setTime(0);
          ref.current.play().catch();
        } catch (e) {
          console.log(e);
        }
      } else {
        ref.current.pause();
      }
    }, [playing, ref.current]);

    useEffect(() => {
      setShareProps({
        opacity: active ? 1 : 0,
        pointerEvents: 'all',
      });

      setContentProps({
        opacity: active ? 0 : 1,
        delay: active ? 3000 : 0,
        pointerEvents: active ? 'none' : 'all',
      });

      if (!active) {
        setVideoEnded(false);
      }
    }, [active]);

    return (
      <div className={s(s.stepsItem, { active, playing })}>
        <Container>
          <div className={s.stepsItem__wrapper} onClick={handleClick}>
            <Content count={count} text={title} style={contentProps} />

            <Share title={title} num={index} style={shareProps} />

            <div
              className={s.stepsItem__media}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <img src={media} alt="" />
            </div>
            {active && (
              <Video
                ref={ref}
                onMouseEnter={handleMouseEnter}
                onVideoCanPlay={handleCanPlay}
                onMouseLeave={handleMouseLeave}
                src={video}
                onVideoEnd={handleVideoEnd}
              />
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
