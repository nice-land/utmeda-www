import * as React from 'react';
import { injectIntl } from 'gatsby-plugin-intl';

import { Step } from 'components/step/Step';
import { Helmet } from 'components/helmet/Helmet';

interface IProps {
  intl: any;
}

function one({ intl }: IProps) {
  const title = intl.formatMessage({ id: 'steps.four.title' });
  const socialTitle = intl.formatMessage({ id: 'steps.four.socialTitle' });
  const text = intl.formatMessage({ id: 'steps.four.text' });
  const video: string = require('assets/videos/four.mp4');
  const poster: string = require('assets/posters/4_bright@2x.jpg');
  const socialPoster: string = require('assets/posters/4_bright@2x.jpg');

  return (
    <>
      <Helmet
        title={socialTitle}
        description={text}
        image={socialPoster}
      />

      <Step
        num={4}
        title={title}
        text={text}
        video={video}
        poster={poster}
      />
    </>
  );
}

export default injectIntl(one);
