import * as Fiber from 'react-three-fiber';
import * as React from 'react';
import { TextureLoader, Group, Mesh, Material } from 'three';
import { TweenLite, Power4 } from 'gsap';

interface IPosterProps {
  index: number;
  stepWatchText: string;
  poster: string;
  active: boolean;
  mouseEnter(props: any): void;
  mouseLeave(): void;
  mouseDown(): void;
}

export const StepPoster = ({
  stepWatchText,
  index,
  poster,
  active,
  mouseEnter,
  mouseLeave,
  mouseDown,
}: IPosterProps) => {
  const ref = React.useRef<Group>();
  const meshRef = React.useRef<Mesh>();
  const loader = new TextureLoader();
  const texture = React.useMemo(() => loader.load(poster), [poster]);

  const width = Math.min(window.innerWidth * 0.66667, 1000);
  const height = width / 1.77777;

  const handleMouseEnter = (e) => {
    mouseEnter({
      text: stepWatchText,
      icon: 'play',
    });
  };

  const handleMouseLeave = () => {
    mouseLeave();
  };

  React.useEffect(() => {
    TweenLite.to(ref.current!.scale, 0.5, {
      x: active ? 1 : 0.8,
      y: active ? 1 : 0.8,
      ease: Power4.easeInOut,
    });
  }, [active]);

  return (
    <group position-x={index * window.innerWidth} ref={ref}>
      <mesh
        ref={meshRef}
        scale={[0.8, 0.8, 0.8]}
        position={[window.innerWidth * 0.15, 0, -10]}
        onPointerOver={handleMouseEnter}
        onPointerDown={mouseDown}
        onPointerOut={handleMouseLeave}
      >
        <planeGeometry attach="geometry" args={[width, height]} />
        <meshBasicMaterial transparent={true} attach="material">
          <primitive attach="map" object={texture} />
        </meshBasicMaterial>
      </mesh>
    </group>
  );
};
