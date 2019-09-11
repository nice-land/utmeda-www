import { debounce } from 'lodash';
import { useState, useEffect } from 'react';

import { useMobile } from './use-mobile';

export function useSlideWidth() {
  if (typeof window === 'undefined') {
    return 720;
  }

  const isMobile = useMobile();
  const offset = isMobile ? 0.85 : 0.9;
  const [width, setWidth] = useState(window.innerWidth * offset);

  const handleResize = debounce(() => {
    setWidth(window.innerWidth * offset);
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
