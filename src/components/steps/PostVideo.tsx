import React, { useContext } from "react";
import { AppContext } from "components/app-layout/AppLayout";

import s from "./PostVideo.scss";
import { Content } from "./Content";
import { useSpring } from "react-spring";

interface IProps {
  visible: boolean;
  text: string;
  nextTitle: string;
  nextNum: number;
}

export const PostVideo = ({ visible, text, nextTitle, nextNum }: IProps) => {
  const context = useContext(AppContext) as any;

  const handleNextClick = () => {
    context.setActiveStep(nextNum);
  };

  return (
    <div className={s(s.postVideo, { visible })}>
      <p className={s.postVideo__text}>{text}</p>

      <Content count={nextNum} text={nextTitle} onClick={handleNextClick} />
    </div>
  );
};
