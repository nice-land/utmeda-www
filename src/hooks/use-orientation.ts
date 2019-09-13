import { useEffect, useState } from 'react';
import { debounce } from 'lodash';

type Orientation = 'portrait' | 'landscape';

export const useOrientation = (): Orientation => {
  if (typeof window === 'undefined') {
    return 'landscape';
  }

  const [landscape, set] = useState(true);

  const handleOrientationChange = debounce(() => {
    set(window.matchMedia('screen and (orientation: landscape)').matches);
  }, 100);

  useEffect(() => {
    handleOrientationChange();

    window.addEventListener('resize', handleOrientationChange);

    return () => {
      window.removeEventListener('resize', handleOrientationChange);
    };
  }, []);

  return landscape ? 'landscape' : 'portrait';
};
