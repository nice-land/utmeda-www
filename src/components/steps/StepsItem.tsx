import { injectIntl, Link } from 'gatsby-plugin-intl';
import { Container } from 'components/container/Container';
import React, { useState, useContext, useEffect } from 'react';
import { AppContext } from 'components/app-layout/AppLayout';
import { useSpring, animated } from 'react-spring';

import { Video } from 'components/video/Video';

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
}

export const StepsItem = injectIntl(
  ({ count, link, text, title, media, intl, active, next, onClick, video }: IProps) => {
    const { mouseEnter, mouseLeave } = useContext(AppContext);
    const [playing, setPlaying] = useState(false);
    const [videoEnded, setVideoEnded] = useState(false);
    const [contentProps, setContentProps] = useSpring(() => ({ opacity: 1 }));

    const handleVideoCanPlay = () => {
      setPlaying(true);
    };

    const handleMouseEnter = () => {
      mouseEnter({
        text: intl.formatMessage({ id: active ? 'step_click' : 'step_watch' }),
        icon: active ? 'mouse' : 'play',
      });
    };

    const handleMouseLeave = () => {
      mouseLeave();
    };

    const handleClick = (e?: React.MouseEvent) => {
      if (e) {
        e.preventDefault();
      }

      if (!active) {
        onClick();
      }
    };

    const handleVideoEnd = () => {
      setPlaying(false);
      setVideoEnded(true);
    };

    useEffect(() => {
      setContentProps({ opacity: active ? 0 : 1 });
    }, [active]);

    return (
      <div className={s(s.stepsItem, { active, playing })}>
        <Container>
          <div className={s.stepsItem__wrapper} onClick={handleClick}>
            <Content
              count={count}
              text={title}
              style={contentProps}
            />

            <div
              className={s.stepsItem__media}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <img src={media} alt="" />
            </div>

            <Video
              active={active}
              playing={active && playing}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              src={video}
              onVideoEnd={handleVideoEnd}
              onVideoPlay={() => void 0}
              onVideoCanPlay={handleVideoCanPlay}
            />

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
