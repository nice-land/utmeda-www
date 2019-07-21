import React, { useState } from 'react';

import s from './Video.scss';

interface IProps {
  video: string;
  poster?: string;
}

export const Video = ({ video, poster }: IProps) => {
  const videoRef = React.useRef<HTMLVideoElement>(null);
  const [light, setLight] = useState(false);
  const [width, setWidth] = React.useState(1280);

  const getHalfWidth = () => {
    const vdo = videoRef.current;
    console.log('-vdo', vdo.videoWidth);

    if (vdo) {
      setWidth(vdo.videoWidth);
    }
  };

  function showLight() {
    setLight(true);
  }

  function showDark() {
    setLight(false);
  }

  function handleLoad() {
    getHalfWidth();
  }

  React.useEffect(() => {
    getHalfWidth();
  }, [video, poster]);

  return (
    <div className={s.video} style={{ width: `${1280}px` }}>
      <div className={s(s.video__content, { light })}>
        <video
          autoPlay
          muted
          loop
          ref={videoRef}
          src={video}
          poster={poster}
          onMouseEnter={showLight}
          onMouseLeave={showDark}
          onTouchStart={showLight}
          onTouchEnd={showDark}
          onLoad={handleLoad}
        />
      </div>
    </div>
  );
};
