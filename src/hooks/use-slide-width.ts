import { debounce } from 'lodash';
import { useState, useEffect, useCallback } from 'react';

import { useMobile } from './use-mobile';

import { useViewportWidth } from './use-viewport-width';
import { useOrientation } from './use-orientation';

export function useSlideWidth() {
  if (typeof window === 'undefined') {
    return 720;
  }
  const isMobile = useMobile();
  const viewport = useViewportWidth();
  const orientation = useOrientation();

  const offset = isMobile ? 0.85 : 0.9;

  const [width, setWidth] = useState(viewport * offset);

  const handleResize = () => {
    setWidth(viewport * offset);
  };

  useEffect(handleResize, [viewport, isMobile, orientation]);

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return width;
}
