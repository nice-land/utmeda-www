import * as React from 'react';
import { injectIntl } from 'gatsby-plugin-intl';

import { Bubbles } from 'components/bubbles/Bubbles';
import { Video } from 'components/video/Video';

interface IProps {
  intl: any;
}

function bubbles({ intl }: IProps) {
  const video = require('assets/videos/four.mp4');

  const bubbs = [
    {
      key: '10',
      scene: 'both',
      timestamp: 2,
      duration: 1.5,
      type: 'incoming',
      msg: intl.formatMessage({ id: 'steps.ten.bubbles.coming' }),
    },
    {
      key: '20',
      scene: 'both',
      timestamp: 5,
      duration: 1.5,
      type: 'reply',
      msg: intl.formatMessage({ id: 'steps.ten.bubbles.not-coming' }),
    },
    {
      key: '22',
      scene: 'both',
      timestamp: 8,
      duration: 1.5,
      type: 'call',
      msg: intl.formatMessage({ id: 'steps.ten.bubbles.call' }),
    },
    {
      key: '30',
      scene: 'both',
      timestamp: 11,
      duration: 1.5,
      type: 'incoming',
      msg: intl.formatMessage({ id: 'steps.ten.bubbles.1717' }),
    },
    {
      key: '50',
      scene: 'both',
      timestamp: 14,
      duration: 1.5,
      type: 'typing',
    },
    {
      key: '60',
      scene: 'both',
      timestamp: 17,
      duration: 1.5,
      type: 'incoming',
      msg: intl.formatMessage({ id: 'steps.ten.bubbles.ok' }),
    },
    {
      key: '70',
      scene: 'light',
      timestamp: 20,
      duration: 1.5,
      type: 'reply',
      msg: intl.formatMessage({ id: 'steps.ten.bubbles.not-feeling-good' }),
    },
  ];

  return (
    <>
      {/* <Bubbles
        bubbles={bubbs}
        all
      /> */}

      <Video
        active={true}
        playing={true}
        onMouseEnter={() => {}}
        onMouseLeave={() => {}}
        src={video}
        onVideoEnd={() => {}}
        onVideoPlay={() => void 0}
        onVideoCanPlay={() => {}}
        bubbles={bubbs}
      />
    </>
  );
}

export default injectIntl(bubbles);
