import { Canvas } from 'components/canvas/Canvas';
import React from 'react';
import DisplacementMap from 'assets/images/displacementmap.png';
import { useKeyDown } from 'hooks/use-keydown';
import { useOrientation } from 'hooks/use-orientation';

import s from './Video.scss';
import { VideoObject } from './VideoObject';

interface IVideoProps {
  src: string;
  poster: string;
  onVideoEnd(): void;
  onMouseEnter(): void;
  onMouseLeave(): void;
}

export const Video = ({ src, onVideoEnd, onMouseEnter, onMouseLeave, poster }: IVideoProps) => {
  const ref = React.useRef<HTMLVideoElement>(null);
  const [light, setLight] = React.useState(false);
  const [canPlay, setCanPlay] = React.useState(false);
  const keys = useKeyDown();
  const orientation = useOrientation();

  const showLight = () => {
    setLight(true);
  };

  const showDark = () => {
    setLight(false);
  };

  const handleEnded = () => {
    onVideoEnd();
  };

  React.useEffect(() => {
    // on space
    if (keys.includes(32)) {
      showLight();
    } else if (!keys.includes(32)) {
      showDark();
    }
  }, [keys]);

  React.useEffect(() => {
    if (ref.current === null) {
      return;
    }

    if (orientation === 'portrait') {
      ref.current!.pause();
    } else {
      ref.current!.play();
    }
  }, [ref, orientation]);

  return (
    <div
      className={s.video}
      onMouseDown={showLight}
      onMouseUp={showDark}
      onTouchStart={showLight}
      onTouchEnd={showDark}
      onTouchCancel={showDark}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className={s.video__content}>
        <video
          className={s.video__video}
          poster={poster}
          ref={ref}
          onCanPlay={() => setCanPlay(true)}
          src={src}
          muted
          autoPlay
          onEnded={handleEnded}
        />

        <div className={s(s.video__render, { canPlay })}>
          <Canvas orthographic={true}>
            <VideoObject
              angle={Math.PI * 4}
              videoRef={ref}
              displacementMap={DisplacementMap}
              showLight={light}
            />
          </Canvas>
        </div>
      </div>
    </div>
  );
};
