import { useEffect, useState } from 'react';

export const useMobile = (): boolean => {
  if (typeof window === 'undefined') {
    return false;
  }

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const { userAgent } = navigator;

    const android = Boolean(userAgent.match(/Android/i));
    const ios = Boolean(userAgent.match(/iPhone|iPad|iPod/i));
    const opera = Boolean(userAgent.match(/Opera Mini/i));
    const windows = Boolean(userAgent.match(/IEMobile/i));

    setIsMobile(android || ios || opera || windows);
  }, []);

  return isMobile;
};
