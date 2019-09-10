import { injectIntl, Link } from 'gatsby-plugin-intl';
import { Container } from 'components/container/Container';
import React, { useState, useContext } from 'react';
import { AppContext } from 'components/app-layout/AppLayout';

import { Content } from './Content';
import s from './StepsItem.scss';
import { Video } from 'components/video/Video';
import { PostVideo } from './PostVideo';

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
}

export const StepsItem = injectIntl(
  ({ count, link, text, title, media, intl, active, next, onClick, video, videoDesktop }: IProps) => {
    const { mouseEnter, mouseLeave } = useContext(AppContext);

    const [playing, setPlaying] = useState(false);
    const [videoEnded, setVideoEnded] = useState(false);

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

    return (
      <div className={s(s.stepsItem, { active, playing })}>
        <Container>
          <Link className={s.stepsItem__wrapper} to={link} onClick={handleClick}>
            <Content count={count} text={title} />

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
              srcDesktop={videoDesktop}
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
          </Link>
        </Container>
      </div>
    );
  },
);
