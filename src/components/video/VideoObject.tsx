import React, { useState } from 'react';
import { debounce } from 'lodash';
import { TweenLite, Power4 } from 'gsap';
import { useThree } from 'react-three-fiber';

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

export const VideoObject = ({
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
