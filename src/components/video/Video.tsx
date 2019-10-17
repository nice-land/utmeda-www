import React, { useState, forwardRef, useImperativeHandle } from 'react';
import { useSpring } from 'react-spring/three';
import { Vector3, Texture } from 'three';

import { Canvas } from 'components/canvas/Canvas';

import { IBubble } from 'utils/interfaces';
import { Bubbles } from 'components/bubbles/Bubbles';

import s from './Video.scss';
import { VideoObject } from './VideoObject';
import { Wave } from './Wave';

// tslint:disable-next-line:no-var-requires
const tone: string = require('assets/videos/tone.mp3');

interface IVideoProps {
  src: string;
  index: number;
  displacementMap: Texture;
  light: boolean;
  onVideoEnd(): void;
  onMouseEnter(): void;
  onMouseLeave(): void;
  onPointerDown(): void;
  onPointerUp(): void;
  onCanPlay?(): void;
  onGlReady?(): void;
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
      index,
      onMouseEnter,
      onMouseLeave,
      onCanPlay,
      onVideoEnd,
      bubbles,
      light,
      onPointerDown,
      onPointerUp,
      onGlReady,
      displacementMap,
    }: IVideoProps,
    outerRef,
  ) => {
    const ref = React.useRef<HTMLVideoElement>(null);
    const audioRef = React.useRef<HTMLAudioElement>(null);
    const [ended, setEnded] = useState<boolean>(false);
    const [waiting, setWaiting] = useState<boolean>(true);
    const [currentTime, setCurrentTime] = useState<number>(0);
    const [buffered, setBuffered] = useState<number>(0);
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

    const handleProgress = (e: any) => {
      const target = e.target as any;

      let current = 0;
      if (target.buffered.length) {
        current = target.buffered.end(0);
      }

      const pct = (100 * current) / (target.duration || 0.0001);

      setBuffered(pct);
    };

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

    const handlePlaying = () => {
      setWaiting(false);
    };

    const handleWaiting = () => {
      setWaiting(true);
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
            playsInline
            autoPlay
            preload=""
            onProgress={handleProgress}
            onPlaying={handlePlaying}
            onWaiting={handleWaiting}
            onCanPlay={onCanPlay}
            onEnded={handleEnded}
            onTimeUpdate={onTimeUpdate}
          />

          <audio
            ref={audioRef}
            src={tone}
            autoPlay
            muted={(ref.current && ref.current!.paused) || light || ended || waiting}
            loop
          />

          {bubbles && (
            <Bubbles
              videoIndex={index}
              bubbles={bubbles}
              currentTime={currentTime}
              scene={light ? 'light' : 'dark'}
            />
          )}

          {ref.current && !isNaN(buffered) && Math.abs(buffered - 100) > 0.001 && waiting && (
            <div className={s.video__progress}>{buffered.toFixed(0)}%</div>
          )}

          <div className={s.video__render}>
            <Canvas
              style={{ background: 'black' }}
              orthographic={true}
              camera={{ position: new Vector3(0, 0, 10) }}
              onCreated={() => onGlReady && onGlReady()}
            >
              <VideoObject angle={Math.PI * 4} videoRef={ref} displacementMap={displacementMap} light={on} />

              {!ended && <Wave erratic={on} />}
            </Canvas>
          </div>
        </div>
      </div>
    );
  },
);
