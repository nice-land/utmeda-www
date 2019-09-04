import * as React from 'react';
import { injectIntl } from 'gatsby-plugin-intl';

import { Step } from 'components/step/Step';
import { Helmet } from 'components/helmet/Helmet';

interface IProps {
  intl: any;
}

function one({ intl }: IProps) {
  const title = intl.formatMessage({ id: 'steps.ten.title' });
  const text = intl.formatMessage({ id: 'steps.ten.text' });
  const video: string = require('assets/videos/ten.mp4');
  const poster: string = require('assets/posters/10_bright@2x.jpg');

  return (
    <>
      <Helmet
        title={title}
        description={text}
      />

      <Step
        num={10}
        title={title}
        text={text}
        video={video}
        poster={poster}
      />
    </>
  );
}

export default injectIntl(one);
