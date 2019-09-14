import React from 'react';
import { useThree, useRender } from 'react-three-fiber';
import { animated as a } from 'react-spring/three';

import createWaveShader from './createWaveShader';

export const Wave = ({ erratic }: { erratic: any }) => {
  const { size } = useThree();
  const dimensions: [number, number] = [size.width, size.height];
  const shaderConfig = React.useMemo(() => createWaveShader(dimensions), []);

  useRender((_, dt) => {
    shaderConfig.uniforms.dt.value = (Math.floor(dt) % 500) / 500.0;
    shaderConfig.uniforms.random.value = Math.random() * 0.2;
  });

  return (
    <group>
      <a.mesh rotation={[0, 0, 0]} position={[0, 0, 1]}>
        <a.planeGeometry attach="geometry" args={dimensions} />
        <a.shaderMaterial
          attach="material"
          args={[shaderConfig]}
          uniforms-erratic-value={erratic.interpolate({ range: [0, 1], output: [0.8, 0.025] })}
        />
      </a.mesh>
    </group>
  );
};
