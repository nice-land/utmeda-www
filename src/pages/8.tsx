import * as React from 'react';
import { injectIntl } from 'gatsby-plugin-intl';

import { Step } from 'components/step/Step';
import { Helmet } from 'components/helmet/Helmet';

interface IProps {
  intl: any;
}

function one({ intl }: IProps) {
  const title = intl.formatMessage({ id: 'steps.eight.title' });
  const text = intl.formatMessage({ id: 'steps.eight.text' });
  const video: string = require('assets/videos/eight.mp4');
  const poster: string = require('assets/posters/eight.jpg');

  return (
    <>
      <Helmet
        title={title}
        description={text}
      />

      <Step
        num={8}
        title={title}
        text={text}
        video={video}
        poster={poster}
      />
    </>
  );
}

export default injectIntl(one);
