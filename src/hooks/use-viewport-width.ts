import * as React from 'react';

import { useOrientation } from './use-orientation';
import { isFacebookApp } from 'utils/isFacebook';

export const useViewportWidth = () => {
  if (typeof window === 'undefined') {
    return 1280;
  }

  const orientation = useOrientation();
  const [viewport, set] = React.useState<number>(window.innerWidth);

  const onResize = React.useCallback(() => {
    console.log(
      'useViewportWidth',
      isFacebookApp() && orientation === 'portrait' ? window.innerHeight : window.innerWidth,
    );
    set(isFacebookApp() && orientation === 'portrait' ? window.innerHeight : window.innerWidth);
  }, [orientation]);

  React.useEffect(onResize, [orientation]);

  React.useEffect(() => {
    window.addEventListener('resize', onResize);

    return () => {
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return viewport;
};
