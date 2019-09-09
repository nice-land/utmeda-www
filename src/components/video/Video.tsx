import { Canvas } from 'components/canvas/Canvas';
import React, { useState, forwardRef, useImperativeHandle } from 'react';
import DisplacementMap from 'assets/images/displacementmap.png';
import { useSpring } from 'react-spring/three';
import { Vector3 } from 'three';
import { Bubbles, IBubble } from 'components/bubbles/Bubbles';

import s from './Video.scss';
import { VideoObject } from './VideoObject';
import { Wave } from './Wave';

// tslint:disable-next-line:no-var-requires
const tone: string = require('assets/videos/tone.mp3');

interface IVideoProps {
  src: string;
  light: boolean;
  onVideoPlay?(): void;
  onVideoEnd(): void;
  onMouseEnter(): void;
  onMouseLeave(): void;
  onPointerDown(): void;
  onPointerUp(): void;
  onVideoCanPlay?(): void;
  bubbles?: IBubble[];
}

export interface IVideoRef {
  play(): Promise<void>;
  pause(): void;
  paused: boolean;
  setTime(t: number): void;
  currentTime: number;
}

export const Video = forwardRef<IVideoRef, IVideoProps>(
  (
    {
      src,
      onVideoPlay,
      onVideoEnd,
      onMouseEnter,
      onMouseLeave,
      onVideoCanPlay,
      bubbles,
      light,
      onPointerDown,
      onPointerUp,
    }: IVideoProps,
    outerRef,
  ) => {
    const ref = React.useRef<HTMLVideoElement>(null);
    const audioRef = React.useRef<HTMLAudioElement>(null);

    const [ended, setEnded] = useState<boolean>(false);
    const [currentTime, setCurrentTime] = useState<number>(0);

    const { on } = useSpring({ on: light ? 1.0 : 0.0 });

    useImperativeHandle(outerRef, () => ({
      play: () => ref.current!.play(),
      pause: () => ref.current!.pause(),
      get paused() {
        return ref.current!.paused;
      },
      setTime: (t: number) => (ref.current!.currentTime = t),
      get currentTime() {
        return ref.current!.currentTime;
      },
    }));

    const handleEnded = () => {
      setEnded(true);

      if (onVideoEnd) {
        onVideoEnd();
      }
    };

    const onTimeUpdate = () => {
      if (ref.current === null) {
        return;
      }

      setCurrentTime(ref.current.currentTime);
    };

    return (
      <div
        className={s.video}
        onMouseDown={onPointerDown}
        onMouseUp={onPointerUp}
        onTouchStart={onPointerDown}
        onTouchEnd={onPointerUp}
        onTouchCancel={onPointerUp}
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
            onTimeUpdate={onTimeUpdate}
          />
          <audio
            ref={audioRef}
            src={tone}
            autoPlay
            muted={(ref.current && ref.current!.paused) || light || ended}
            loop
          />

          {bubbles && (
            <Bubbles bubbles={bubbles} currentTime={currentTime} scene={light ? 'light' : 'dark'} />
          )}

          <div className={s.video__render}>
            <Canvas orthographic={true} camera={{ position: new Vector3(0, 0, 10) }}>
              <VideoObject angle={Math.PI * 4} videoRef={ref} displacementMap={DisplacementMap} light={on} />
              <Wave erratic={on} />
            </Canvas>
          </div>
        </div>
      </div>
    );
  },
);
