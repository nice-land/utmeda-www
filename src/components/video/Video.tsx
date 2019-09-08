import { Canvas } from "components/canvas/Canvas";
import React, { useState } from "react";
import DisplacementMap from "assets/images/displacementmap.png";
import { useKeyDown } from "hooks/use-keydown";
import { useSpring } from "react-spring/three";
import { useOrientation } from "hooks/use-orientation";
import { Vector3 } from "three";

import s from "./Video.scss";
import { VideoObject } from "./VideoObject";
import { Wave } from "./Wave";

// tslint:disable-next-line:no-var-requires
const tone: string = require("assets/videos/tone.mp3");

interface IVideoProps {
  src: string;
  playing: boolean;
  onVideoPlay(): void;
  onVideoEnd(): void;
  onMouseEnter(): void;
  onMouseLeave(): void;
  onVideoCanPlay(): void;
}

export const Video = ({
  playing,
  src,
  onVideoPlay,
  onVideoEnd,
  onMouseEnter,
  onMouseLeave,
  onVideoCanPlay
}: IVideoProps) => {
  // if (typeof window === "undefined") {
  //   return null;
  // }

  const ref = React.useRef<HTMLVideoElement>(null);
  const audioRef = React.useRef<HTMLAudioElement>(null);
  const [light, setLight] = React.useState(false);
  const [ended, setEnded] = useState<boolean>(false);
  const keys = useKeyDown();
  const orientation = useOrientation();
  const { on } = useSpring({ on: light ? 1.0 : 0.0 });

  const showLight = (e?: Event) => {
    e && e.stopPropagation();
    ref.current!.play();
    setLight(true);
  };

  const showDark = (e?: Event) => {
    e && e.stopPropagation();
    setLight(false);
  };

  const handleEnded = () => {
    setEnded(true);
    ref.current!.pause();
    ref.current!.currentTime = 0;
    onVideoEnd();
  };

  React.useEffect(() => {
    if (!playing || typeof window === "undefined") {
      return;
    }

    // on space
    if (playing && keys.includes(32)) {
      showLight();
    } else if (playing && !keys.includes(32)) {
      showDark();
    }
  }, [playing, keys]);

  React.useEffect(() => {
    if (!ref.current || typeof window === "undefined") {
      return;
    }

    if (orientation === "portrait") {
      ref.current.pause();
    } else if (ref.current.readyState >= 2) {
      ref.current.play().catch(); // swallow autoplay errors
    }
  }, [playing, ref, orientation]);

  React.useEffect(() => {
    if (!ref.current || typeof window === "undefined") {
      return;
    }

    if (!playing) {
      ref.current.pause();
      ref.current!.currentTime = 0;
    } else {
      ref.current.play().catch(); // swallow autoplay errors
    }
  }, [playing, ref.current]);

  return (
    <div
      className={s(s.video, { playing })}
      onMouseDown={showLight as any}
      onMouseUp={showDark as any}
      onTouchStart={showLight as any}
      onTouchEnd={showDark as any}
      onTouchCancel={showDark as any}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className={s.video__content}>
        <video
          className={s.video__video}
          ref={ref}
          src={src}
          onCanPlayThrough={onVideoCanPlay}
          playsInline
          onPlay={onVideoPlay}
          onEnded={handleEnded}
          onTouchStart={showLight as any}
          onTouchEnd={showDark as any}
        />
        <audio
          ref={audioRef}
          src={tone}
          autoPlay
          muted={!playing || light || ended}
          loop
        />

        {playing && (
          <div className={s.video__render}>
            <Canvas
              orthographic={true}
              camera={{ position: new Vector3(0, 0, 10) }}
            >
              <VideoObject
                angle={Math.PI * 4}
                videoRef={ref}
                displacementMap={DisplacementMap}
                light={on}
              />
              <Wave erratic={on} />
            </Canvas>
          </div>
        )}
      </div>
    </div>
  );
};
