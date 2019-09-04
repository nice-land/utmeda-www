import { Canvas } from 'components/canvas/Canvas';
import { useThree } from 'react-three-fiber';
import React, { useState } from 'react';
import DisplacementMap from 'assets/images/displacementmap.png';
import { useKeyDown } from 'hooks/use-keydown';
import { TweenLite, Power4 } from 'gsap';
import { useOrientation } from 'hooks/use-orientation';
import { debounce } from 'lodash';

import s from './Video.scss';
import createRippleShader from './createRippleShader';

interface IProps {
  videoRef: React.RefObject<HTMLVideoElement>;
  angle: number;
  showLight: boolean;
  displacementMap: any;
  intensity1?: number;
  intensity2?: number;
  angle2?: number;
}

const ASPECT = 1.7777777;

const VideoObject = ({
  videoRef,
  angle,
  displacementMap,
  showLight,
  intensity1 = 0.2,
  intensity2 = 0.2,
  angle2 = -3 * angle,
}: IProps) => {
  const { invalidate, ready } = useThree();
  const [dimensions, set] = useState<[number, number]>([window.innerWidth, window.innerWidth / ASPECT]);

  if (videoRef.current === null) {
    return null;
  }

  const shaderConfig = React.useMemo(
    () => createRippleShader(videoRef.current!, intensity1, intensity2, angle, angle2, displacementMap),
    [videoRef, intensity1, intensity2, angle, angle2, displacementMap],
  );

  React.useEffect(() => {
    TweenLite.to(shaderConfig.uniforms.dispFactor, 1, {
      value: Number(showLight),
      ease: Power4.easeOut,
      onUpdate: invalidate,
      onComplete: invalidate,
    });
  }, [showLight, ready]);

  const handleResize = debounce(() => {
    const geometryWidth = window.innerWidth;
    const geometryHeight = window.innerWidth / ASPECT;
    set([geometryWidth, geometryHeight]);
  }, 200);

  React.useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    window.addEventListener('resize', handleResize);

    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <group>
      <mesh rotation={[0, 0, 0]}>
        <boxGeometry attach="geometry" args={[...dimensions, 0] as [number, number, number]} />
        <shaderMaterial attach="material" args={[shaderConfig]} />
      </mesh>
    </group>
  );
};

interface IVideoProps {
  src: string;
  onVideoEnd(): void;
  onMouseEnter(): void;
  onMouseLeave(): void;
}

export const Video = ({ src, onVideoEnd, onMouseEnter, onMouseLeave }: IVideoProps) => {
  const ref = React.useRef<HTMLVideoElement>(null);
  const [light, setLight] = React.useState(false);
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
        <video className={s.video__video} ref={ref} src={src} muted autoPlay onEnded={handleEnded} />

        <div className={s.video__render}>
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
