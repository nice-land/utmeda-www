import { useEffect, useState } from 'react';

export const useMobile = (): boolean => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const { userAgent } = navigator;

    const isAndroid = Boolean(userAgent.match(/Android/i));
    const isIos = Boolean(userAgent.match(/iPhone|iPad|iPod/i));

    setIsMobile(isAndroid || isIos);
  }, []);

  return isMobile;
};
