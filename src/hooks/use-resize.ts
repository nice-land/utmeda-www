import * as React from 'react';

export const useResize = () => {
  const [isMobile, setMobile] = React.useState<boolean>(false);

  const onResize = () => {
    if (typeof window === undefined) {
      return;
    }

    setMobile(window.matchMedia('(max-width: 1279px)').matches);
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

  return isMobile;
};
