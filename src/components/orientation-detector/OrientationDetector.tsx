import React, { useEffect, useState } from 'react';
import { FormattedMessage } from 'gatsby-plugin-intl';
import { useOrientation } from 'hooks/use-orientation';
import Phone from 'assets/svg/phone.svg';
import { isFacebookApp } from 'utils/isFacebook';

import s from './OrientationDetector.scss';

export const OrientationDetector = () => {
  const orientation = useOrientation();
  const [isFacebook, set] = useState();

  useEffect(() => {
    set(isFacebookApp());
  }, []);

  return (
    <div className={s(s.orientationDetector, { portrait: orientation === 'portrait', isFacebook })}>
      <Phone className={s.orientationDetector__phone} />

      <p className={s.orientationDetector__message}>
        {isFacebook && (
          <FormattedMessage
            id="orientation.facebook"
            defaultMessage={`Því miður virkar þessi vefur ekki í þessum vafra. Þú getur opnað hann í Safari með því að smella á merkið í efra hægra horninu, og velja "Open in Safari".`}
          />
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
