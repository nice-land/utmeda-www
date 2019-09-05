import * as React from 'react';
import { TweenLite, Power4 } from 'gsap';
import { useThree } from 'react-three-fiber';

interface IControllerProps {
  container: HTMLDivElement;
}

export const Controller = ({ container }: IControllerProps) => {
  const { camera, invalidate } = useThree();

  const handleScroll = () => {
    TweenLite.to(camera.position, 0.5, {
      x: container.scrollLeft,
      onUpdate: invalidate,
      onComplete: invalidate,
    });
  };

  React.useEffect(() => {
    if (!container) {
      return;
    }
    container.addEventListener('scroll', handleScroll);

    return () => container.removeEventListener('scroll', handleScroll);
  }, [container]);

  return null;
};
