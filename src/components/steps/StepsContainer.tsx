import React from 'react';
import { injectIntl } from 'gatsby-plugin-intl';
import { IStep } from 'utils/interfaces';
import Helmet from 'react-helmet';

import { Steps } from './Steps';

interface IProps {
  initialStep?: number;
  intl: any;
}

export const StepsContainer = injectIntl(({ initialStep, intl }: IProps) => {
  const steps: IStep[] = [
    {
      num: 1,
      title: intl.formatMessage({ id: 'steps.one.title' }),
      text: intl.formatMessage({ id: 'steps.one.text' }),
      poster: require('assets/posters/1_bright@2x.jpg'),
      video: require('assets/videos/one.mp4'),
    },
    {
      num: 2,
      title: intl.formatMessage({ id: 'steps.two.title' }),
      text: intl.formatMessage({ id: 'steps.two.text' }),
      poster: require('assets/posters/2_bright@2x.jpg'),
      video: require('assets/videos/two.mp4'),
    },
    {
      num: 3,
      title: intl.formatMessage({ id: 'steps.three.title' }),
      text: intl.formatMessage({ id: 'steps.three.text' }),
      poster: require('assets/posters/3_bright@2x.jpg'),
      video: require('assets/videos/three.mp4'),
    },
    {
      num: 4,
      title: intl.formatMessage({ id: 'steps.four.title' }),
      text: intl.formatMessage({ id: 'steps.four.text' }),
      poster: require('assets/posters/4_bright@2x.jpg'),
      video: require('assets/videos/four.mp4'),
      bubbles: [
        // Play football?
        {
          key: '1',
          scene: 'both',
          timestamp: 9,
          duration: 9,
          type: 'incoming',
          msg: intl.formatMessage({ id: 'steps.four.bubbles.play' }),
        },
      ],
    },
    {
      num: 5,
      title: intl.formatMessage({ id: 'steps.five.title' }),
      text: intl.formatMessage({ id: 'steps.five.text' }),
      poster: require('assets/posters/5_bright@2x.jpg'),
      video: require('assets/videos/five.mp4'),
      bubbles: [
        // Can you work on Friday?
        {
          key: '1',
          scene: 'both',
          timestamp: 7.11,
          duration: 4,
          type: 'incoming',
          msg: intl.formatMessage({ id: 'steps.five.bubbles.work' }),
        },
        // Can you work on Friday?
        {
          key: '2',
          scene: 'both',
          timestamp: 21.09,
          duration: 9,
          type: 'incoming',
          msg: intl.formatMessage({ id: 'steps.five.bubbles.work' }),
        },
        // Yes
        {
          key: '3',
          scene: 'dark',
          timestamp: 25.17,
          duration: 5,
          type: 'reply',
          msg: intl.formatMessage({ id: 'steps.five.bubbles.yes' }),
        },
        // No
        {
          key: '4',
          scene: 'light',
          timestamp: 25.17,
          duration: 5,
          type: 'reply',
          msg: intl.formatMessage({ id: 'steps.five.bubbles.no' }),
        },
      ],
    },
    {
      num: 6,
      title: intl.formatMessage({ id: 'steps.six.title' }),
      text: intl.formatMessage({ id: 'steps.six.text' }),
      poster: require('assets/posters/6_bright@2x.jpg'),
      video: require('assets/videos/six.mp4'),
    },
    {
      num: 7,
      title: intl.formatMessage({ id: 'steps.seven.title' }),
      text: intl.formatMessage({ id: 'steps.seven.text' }),
      poster: require('assets/posters/7_bright@2x.jpg'),
      video: require('assets/videos/seven.mp4'),
    },
    {
      num: 8,
      title: intl.formatMessage({ id: 'steps.eight.title' }),
      text: intl.formatMessage({ id: 'steps.eight.text' }),
      poster: require('assets/posters/8_bright@2x.jpg'),
      video: require('assets/videos/eight.mp4'),
    },
    {
      num: 9,
      title: intl.formatMessage({ id: 'steps.nine.title' }),
      text: intl.formatMessage({ id: 'steps.nine.text' }),
      poster: require('assets/posters/9_bright@2x.jpg'),
      video: require('assets/videos/nine.mp4'),
    },
    {
      num: 10,
      title: intl.formatMessage({ id: 'steps.ten.title' }),
      text: intl.formatMessage({ id: 'steps.ten.text' }),
      poster: require('assets/posters/10_bright@2x.jpg'),
      video: require('assets/videos/ten.mp4'),
      bubbles: [
        {
          key: '10',
          scene: 'both',
          timestamp: 3.15,
          duration: 20.85,
          type: 'incoming',
          msg: intl.formatMessage({ id: 'steps.ten.bubbles.coming' }),
        },
        {
          key: '20',
          scene: 'both',
          timestamp: 11.17,
          duration: 12.83,
          type: 'reply',
          msg: intl.formatMessage({ id: 'steps.ten.bubbles.not-coming' }),
        },
        {
          key: '22',
          scene: 'both',
          timestamp: 12.17,
          duration: 5,
          type: 'call',
          msg: intl.formatMessage({ id: 'steps.ten.bubbles.call' }),
        },
        //{
        //  key: '25',
        //  scene: 'both',
        //  timestamp: 19,
        //  duration: 3,
        //  type: 'typing',
        //},
        {
          key: '30',
          scene: 'both',
          timestamp: 18,
          duration: 8,
          type: 'incoming',
          msg: intl.formatMessage({ id: 'steps.ten.bubbles.1717' }),
        },
        {
          key: '50',
          scene: 'both',
          timestamp: 21.15,
          duration: 2,
          type: 'typing',
        },
        {
          key: '60',
          scene: 'both',
          timestamp: 23.15,
          duration: 19.05,
          type: 'incoming',
          msg: intl.formatMessage({ id: 'steps.ten.bubbles.ok' }),
        },
        {
          key: '70',
          scene: 'light',
          timestamp: 30.20,
          duration: 12,
          type: 'reply',
          msg: intl.formatMessage({ id: 'steps.ten.bubbles.not-feeling-good' }),
        },
      ],
    },
  ];

  return (
    <>
      <Helmet>
        {steps.map((s) => (
          <link rel="preload" href={s.video} key={s.num} as="video" />
        ))}
      </Helmet>
      <Steps initialStep={initialStep} list={steps} title={intl.formatMessage({ id: 'title' })} />
    </>
  );
});
