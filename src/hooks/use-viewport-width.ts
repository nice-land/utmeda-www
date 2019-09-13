import * as React from 'react';
import { isFacebookApp } from 'utils/isFacebook';

import { useOrientation } from './use-orientation';

export const useViewportWidth = () => {
  const orientation = useOrientation();
  const [viewport, set] = React.useState<number>(window.innerWidth);

  const isFacebook = React.useMemo(() => isFacebookApp(), [window]);

  const onResize = () => {
    if (typeof window === undefined) {
      return;
    }

    const vp = isFacebook && orientation === 'portrait' ? window.innerHeight : window.innerWidth;
    set(vp);
  };

  React.useEffect(() => {
    if (typeof window === undefined) {
      return;
    }

    onResize();
    window.addEventListener('resize', onResize);

    return () => {
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return viewport;
};
