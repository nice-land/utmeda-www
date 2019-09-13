import React, { useEffect, useState } from 'react';
import { FormattedMessage } from 'gatsby-plugin-intl';
import { useOrientation } from 'hooks/use-orientation';
import Phone from 'assets/svg/phone.svg';

import s from './OrientationDetector.scss';

function isFacebookApp() {
  if (typeof window === 'undefined') {
    return false;
  }

  const w = window as any;

  const ua = navigator.userAgent || navigator.vendor || w.opera;

  return ua.indexOf('FBIOS') > -1 || ua.indexOf('FBAN') > -1;
}

export const OrientationDetector = () => {
  const orientation = useOrientation();
  const [isFacebook, set] = useState();

  useEffect(() => {
    set(isFacebookApp());
  }, []);

  return (
    <div
      className={s(s.orientationDetector, { portrait: isFacebook || orientation === 'portrait', isFacebook })}
    >
      <Phone className={s.orientationDetector__phone} />

      <p className={s.orientationDetector__message}>
        {isFacebook && (
          <>
            <FormattedMessage
              id="orientation.facebook"
              defaultMessage={`Þú ert að nota innbyggða Facebook vafrann.
            Vinsamlegast opnaðu síðuna í netvafranum á símanum þínum fyrir betri upplifun.`}
            />

            <a href="https://www.utmeda.is" target="_blank">
              Opna í vafra
            </a>
          </>
        )}

        {!isFacebook && (
          <FormattedMessage
            id="orientation.pleaseRotate"
            defaultMessage="Vinsamlegast snúðu tækinu þínu eða stækkaðu gluggann."
          />
        )}
      </p>
    </div>
  );
};
