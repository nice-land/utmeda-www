import * as React from 'react';
import { injectIntl } from 'gatsby-plugin-intl';

import { Bubbles } from 'components/bubbles/Bubbles';

interface IProps {
  intl: any;
}

function bubbles({ intl }: IProps) {

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
    {
      key: '10',
      scene: 'both',
      timestamp: 3,
      duration: 3,
      type: 'reply-erase',
      msg: intl.formatMessage({ id: 'steps.ten.bubbles.no' }),
    },
    // No, I'm busy
    {
      key: '2',
      scene: 'light',
      timestamp: 4,
      duration: 3,
      type: 'reply',
      msg: intl.formatMessage({ id: 'steps.five.bubbles.yes' }),
    },
    // Sure
    {
      key: '3',
      scene: 'dark',
      timestamp: 4,
      duration: 3,
      type: 'reply',
      msg: intl.formatMessage({ id: 'steps.five.bubbles.no' }),
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
    {
      key: '6',
      scene: 'dark',
      timestamp: 4,
      duration: 3,
      type: 'browser',
    },
    {
      key: '70',
      scene: 'light',
      timestamp: 30,
      duration: 12,
      type: 'reply',
      theme: '1717',
      msg: intl.formatMessage({ id: 'steps.ten.bubbles.not-feeling-good' }),
    },
    {
      key: '50',
      scene: 'light',
      timestamp: 21.15,
      duration: 2,
      theme: '1717',
      type: 'typing',
    },
  ];

  return (
    <>
      <Bubbles
        bubbles={bubbles}
        all
      />
    </>
  );
}

export default injectIntl(bubbles);
