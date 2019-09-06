import { Canvas } from 'components/canvas/Canvas';
import { useThree, useRender } from 'react-three-fiber';
import React, { useState } from 'react';
import DisplacementMap from 'assets/images/displacementmap.png';
import { useKeyDown } from 'hooks/use-keydown';
import { useSpring, a } from 'react-spring/three';
import { useOrientation } from 'hooks/use-orientation';
import { Vector3 } from 'three';

import s from './Video.scss';

import createWaveShader from './createWaveShader';
import createRippleShader from './createRippleShader';

// tslint:disable-next-line:no-var-requires
const tone: string = require('assets/videos/tone.mp3');

interface IProps {
  videoRef: React.RefObject<HTMLVideoElement>;
  angle: number;
  light: any;
  displacementMap: any;
  intensity1?: number;
  intensity2?: number;
  angle2?: number;
}

const ASPECT = 1.7777777;

const Wave = ({ erratic }: { erratic: any }) => {
  const { size } = useThree();
  const dimensions: [number, number] = [size.width, size.width / ASPECT];

  const shaderConfig = React.useMemo(() => createWaveShader(dimensions), []);

  useRender((_, dt) => {
    shaderConfig.uniforms.dt.value = dt;
    shaderConfig.uniforms.random.value = Math.random() * 0.2;
  });

  return (
    <group>
      <a.mesh rotation={[0, 0, 0]} position={[0, 0, 1]}>
        <a.planeGeometry attach="geometry" args={dimensions} />
        <a.shaderMaterial
          attach="material"
          args={[shaderConfig]}
          uniforms-erratic-value={erratic.interpolate({ range: [0, 1], output: [1, 0] })}
        />
      </a.mesh>
    </group>
  );
};

const VideoObject = ({
  videoRef,
  angle,
  displacementMap,
  light,
  intensity1 = 0.2,
  intensity2 = 0.2,
  angle2 = -3 * angle,
}: IProps) => {
  const { size } = useThree();

  const dimensions = [size.width, size.width / ASPECT];

  if (videoRef.current === null) {
    return null;
  }

  const shaderConfig = React.useMemo(
    () => createRippleShader(videoRef.current!, intensity1, intensity2, angle, angle2, displacementMap),
    [videoRef, intensity1, intensity2, angle, angle2, displacementMap],
  );

  return (
    <group>
      <mesh rotation={[0, 0, 0]}>
        <boxGeometry attach="geometry" args={[...dimensions, 0] as [number, number, number]} />
        <shaderMaterial attach="material" args={[shaderConfig]} uniforms-dispFactor={light} />
      </mesh>
    </group>
  );
};

interface IVideoProps {
  src: string;
  onVideoPlay(): void;
  onVideoEnd(): void;
  onMouseEnter(): void;
  onMouseLeave(): void;
}

export const Video = ({ src, onVideoPlay, onVideoEnd, onMouseEnter, onMouseLeave }: IVideoProps) => {
  const ref = React.useRef<HTMLVideoElement>(null);
  const audioRef = React.useRef<HTMLAudioElement>(null);
  const [light, setLight] = React.useState(false);
  const [ended, setEnded] = useState<boolean>(false);
  const keys = useKeyDown();
  const orientation = useOrientation();
  const { on } = useSpring({ on: light ? 1.0 : 0.0 });

  const showLight = () => {
    ref.current!.play();
    setLight(true);
  };

  const showDark = () => {
    setLight(false);
  };

  const handleEnded = () => {
    setEnded(true);
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
    if (ref.current === null || (ref.current && ref.current.readyState < 2)) {
      return;
    }

    if (orientation === 'portrait') {
      ref.current.pause();
    } else {
      ref.current.play().catch(); // swallow autoplay errors
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
          ref={ref}
          src={src}
          playsInline
          // muted
          autoPlay
          onPlay={onVideoPlay}
          onEnded={handleEnded}
          onTouchStart={showLight}
          onTouchEnd={showDark}
        />
        <audio ref={audioRef} src={tone} autoPlay muted={light || ended} loop />

        {ref.current && ref.current.readyState > 1 && (
          <div className={s.video__render}>
            <Canvas orthographic={true} camera={{ position: new Vector3(0, 0, 10) }}>
              <VideoObject angle={Math.PI * 4} videoRef={ref} displacementMap={DisplacementMap} light={on} />
              <Wave erratic={on} />
            </Canvas>
          </div>
        )}
      </div>
    </div>
  );
};
