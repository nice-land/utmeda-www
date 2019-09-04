import { useEffect, useState } from 'react';

type Orientation = 'portrait' | 'landscape';

export const useOrientation = (): Orientation => {
  const [landscape, set] = useState(false);

  const handleOrientationChange = (ev: MediaQueryListEvent) => set(ev.matches);

  useEffect(() => {
    const media = window.matchMedia('(orientation: landscape)');

    set(media.matches);

    media.addEventListener('change', handleOrientationChange);

    return () => media.removeEventListener('change', handleOrientationChange);
  }, []);

  return landscape ? 'landscape' : 'portrait';
};
