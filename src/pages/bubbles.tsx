import * as React from 'react';
import { injectIntl } from 'gatsby-plugin-intl';

import { Video } from 'components/video/Video';
import { Bubbles } from 'components/bubbles/Bubbles';

interface IProps {
  intl: any;
}

function bubbles({ intl }: IProps) {
  const video = require('assets/videos/four.mp4');

  const bubbles = [
    // Can you work Friday?
    {
      key: '1',
      scene: 'both',
      timestamp: 2,
      duration: 3,
      type: 'incoming',
      msg: intl.formatMessage({ id: 'steps.four.bubbles.play' }),
    },
    // No, I'm busy
    {
      key: '2',
      scene: 'light',
      timestamp: 4,
      duration: 3,
      type: 'reply',
      msg: intl.formatMessage({ id: 'steps.four.bubbles.yes' }),
    },
    // Sure
    {
      key: '3',
      scene: 'dark',
      timestamp: 4,
      duration: 3,
      type: 'reply',
      msg: intl.formatMessage({ id: 'steps.four.bubbles.no' }),
    },
    // calling
    {
      key: '4',
      scene: 'dark',
      timestamp: 4,
      duration: 3,
      type: 'call',
      msg: `Karen ${intl.formatMessage({ id: 'call' })}`,
    },
    // typing
    {
      key: '5',
      scene: 'dark',
      timestamp: 4,
      duration: 3,
      type: 'typing',
    },
  ];

  return (
    <>
      <Bubbles
        bubbles={bubbles}
        all
      />

      {/*
      <Video
        active={true}
        playing={true}
        onMouseEnter={() => {}}
        onMouseLeave={() => {}}
        src={video}
        onVideoEnd={() => {}}
        onVideoPlay={() => void 0}
        onVideoCanPlay={() => {}}
        bubbles={bubbles}
      />
      */}
    </>
  );
}

export default injectIntl(bubbles);
