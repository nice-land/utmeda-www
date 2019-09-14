import React from 'react';
import { useThree } from 'react-three-fiber';

import createRippleShader from './createRippleShader';

interface IProps {
  videoRef: React.RefObject<HTMLVideoElement>;
  angle: number;
  light: any;
  displacementMap: any;
  intensity1?: number;
  intensity2?: number;
  angle2?: number;
}

export const VideoObject = ({
  videoRef,
  angle,
  displacementMap,
  light,
  intensity1 = 0.2,
  intensity2 = 0.2,
  angle2 = -3 * angle,
}: IProps) => {
  const { size } = useThree();

  let dimensions = [size.width, size.width / 1.7777776];

  if (dimensions[1] < size.height) {
    const resizeFactor = size.height / dimensions[1];
    
    dimensions = [size.width * resizeFactor, size.height];
  }

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
