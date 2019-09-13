import { debounce } from 'lodash';
import { useState, useEffect } from 'react';

import { useMobile } from './use-mobile';

import { useViewportWidth } from './use-viewport-width';

export function useSlideWidth() {
  if (typeof window === 'undefined') {
    return 720;
  }
  const isMobile = useMobile();
  const viewport = useViewportWidth();
  const offset = isMobile ? 0.85 : 0.9;
  const [width, setWidth] = useState(viewport * offset);

  const handleResize = debounce(() => {
    setWidth(viewport * offset);
  }, 200);

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return width;
}
