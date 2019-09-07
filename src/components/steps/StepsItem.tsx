import { injectIntl, Link } from "gatsby-plugin-intl";
import { Container } from "components/container/Container";
import React, { useEffect, useState, useContext } from "react";
import { AppContext } from "components/app-layout/AppLayout";
import { animated as a } from "react-spring";

import { Content } from "./Content";
import s from "./StepsItem.scss";
import { Video } from "components/video/Video";

interface IProps {
  intl: any;
  count: string;
  link: string;
  text: string;
  media: string;
  index: number;
  spring: any;
  active: boolean;
  video: string;
  onClose(): void;
  onClick(): void;
}

export const StepsItem = injectIntl(
  ({
    count,
    link,
    text,
    media,
    intl,
    active,
    onClose,
    onClick,
    video
  }: IProps) => {
    const { mouseEnter, mouseLeave } = useContext(AppContext);

    const handleMouseEnter = () => {
      mouseEnter({
        text: intl.formatMessage({ id: "step_watch" }),
        icon: "play"
      });
    };

    const handleMouseLeave = () => {
      mouseLeave();
    };

    const handleClick = e => {
      e.preventDefault();

      mouseLeave();

      if (!active) {
        onClick();
      } else {
        //onClose();
      }
    };

    return (
      <div className={s(s.stepsItem, { active })}>
        <Container>
          <Link
            className={s.stepsItem__wrapper}
            to={link}
            onClick={handleClick}
          >
            <Content count={count} text={text} />

            <a.div
              className={s.stepsItem__media}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <img src={media} alt="" />
            </a.div>

            <Video
              playing={active}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              src={video}
              onVideoEnd={onClose}
              onVideoPlay={() => void 0}
            />
          </Link>
        </Container>
      </div>
    );
  }
);
