import React from 'react';
import { useOrientation } from 'hooks/use-orientation';
import Phone from 'assets/svg/phone.svg';

import s from './OrientationDetector.scss';

export const OrientationDetector = () => {
  const orientation = useOrientation();

  return (
    <div className={s(s.orientationDetector, { portrait: orientation === 'portrait' })}>
      <Phone className={s.orientationDetector__phone} />
    </div>
  );
};
