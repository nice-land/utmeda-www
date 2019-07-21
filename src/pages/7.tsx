import * as React from 'react';
import { injectIntl } from 'gatsby-plugin-intl';

import { Step } from 'components/step/Step';
import { Helmet } from 'components/helmet/Helmet';

interface IProps {
  intl: any;
}

function one({ intl }: IProps) {
  const title = intl.formatMessage({ id: 'steps.seven.title' });
  const text = intl.formatMessage({ id: 'steps.seven.text' });
  const video: string = require('assets/videos/seven.mp4');
  const poster: string = require('assets/posters/seven.jpg');

  return (
    <>
      <Helmet
        title={title}
        description={text}
      />

      <Step
        num={7}
        title={title}
        text={text}
        video={video}
        poster={poster}
      />
    </>
  );
}

export default injectIntl(one);
