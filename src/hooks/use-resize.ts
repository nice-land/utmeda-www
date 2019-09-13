import * as React from 'react';

export const useResize = () => {
  if (typeof window === undefined) {
    return false;
  }

  const [isMobile, setMobile] = React.useState<boolean>(false);

  const onResize = () => {
    setMobile(window.matchMedia('(max-width: 1279px)').matches);
  };

  React.useEffect(() => {
    onResize();
    window.addEventListener('resize', onResize);

    return () => {
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return isMobile;
};
