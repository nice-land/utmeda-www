import React, { useState } from 'react';

import s from './Video.scss';

interface IProps {
  video: string;
  poster?: string;
}

export const Video = ({ video, poster }: IProps) => {
  const [light, setLight] = useState(false);

  function showLight() {
    setLight(true);
  }

  function showDark() {
    setLight(false);
  }

  return (
    <div className={s.video}>
      <div className={s(s.video__content, { light })}>
        <video
          autoPlay
          muted
          loop
          src={video}
          poster={poster}
          onMouseEnter={showLight}
          onMouseLeave={showDark}
          onTouchStart={showLight}
          onTouchEnd={showDark}
        />
      </div>
    </div>
  );
};
