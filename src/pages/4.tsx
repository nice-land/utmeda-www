import * as React from 'react';
import { injectIntl } from 'gatsby-plugin-intl';

import { Step } from 'components/step/Step';
import { Helmet } from 'components/helmet/Helmet';
import { IBubble } from 'components/bubbles/Bubbles';

interface IProps {
  intl: any;
}

function four({ intl }: IProps) {
  const title = intl.formatMessage({ id: 'steps.four.title' });
  const socialTitle = intl.formatMessage({ id: 'steps.four.socialTitle' });

  const text = intl.formatMessage({ id: 'steps.four.text' });
  const video: string = require('assets/videos/four.mp4');
  const poster: string = require('assets/posters/4_bright@2x.jpg');
  const socialPoster: string = require('assets/posters/4_bright@2x.jpg');

  const bubbles: IBubble[] = [
    // Can you work Friday?
    {
      scene: 'both',
      timestamp: 9,
      duration: 3,
      type: 'incoming',
      msg: intl.formatMessage({ id: 'steps.four.bubbles[0]' }),
    },
  ];
  /*
  const bubbles: IBubble[] = [
    // Can you work Friday?
    {
      scene: 'both',
      timestamp: 9,
      duration: 3,
      type: 'incoming',
      msg: intl.formatMessage({ id: 'steps.four.bubbles[0]' }),
    },
    // No, I'm busy
    {
      scene: 'light',
      timestamp: 15,
      duration: 3,
      type: 'reply',
      msg: intl.formatMessage({ id: 'steps.four.bubbles[1]' }),
    },
    // Sure
    {
      scene: 'dark',
      timestamp: 15,
      duration: 3,
      type: 'reply',
      msg: intl.formatMessage({ id: 'steps.four.bubbles[2]' }),
    },
  ];
  */

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
        bubbles={bubbles}
      />
    </>
  );
}

export default injectIntl(four);
