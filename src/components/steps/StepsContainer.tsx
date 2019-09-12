import React from 'react';
import { injectIntl } from 'gatsby-plugin-intl';

import { IStep } from 'utils/interfaces';
import { Loader } from 'components/loader/Loader';

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
      videoDesktop: require('assets/videos/oneDesk.mp4'),
    },
    {
      num: 2,
      title: intl.formatMessage({ id: 'steps.two.title' }),
      text: intl.formatMessage({ id: 'steps.two.text' }),
      poster: require('assets/posters/2_bright@2x.jpg'),
      video: require('assets/videos/two.mp4'),
      videoDesktop: require('assets/videos/twoDesk.mp4'),
    },
    {
      num: 3,
      title: intl.formatMessage({ id: 'steps.three.title' }),
      text: intl.formatMessage({ id: 'steps.three.text' }),
      poster: require('assets/posters/3_bright@2x.jpg'),
      video: require('assets/videos/three.mp4'),
      videoDesktop: require('assets/videos/threeDesk.mp4'),
    },
    {
      num: 4,
      title: intl.formatMessage({ id: 'steps.four.title' }),
      text: intl.formatMessage({ id: 'steps.four.text' }),
      poster: require('assets/posters/4_bright@2x.jpg'),
      video: require('assets/videos/four.mp4'),
      videoDesktop: require('assets/videos/fourDesk.mp4'),
      bubbles: [
        // Play football?
        {
          key: '1',
          scene: 'both',
          timestamp: 11,
          duration: 6.5,
          type: 'incoming',
          msg: intl.formatMessage({ id: 'steps.four.bubbles.play' }),
          seen: {
            dark: false,
            light: true,
          },
        },
      ],
    },
    {
      num: 5,
      title: intl.formatMessage({ id: 'steps.five.title' }),
      text: intl.formatMessage({ id: 'steps.five.text' }),
      poster: require('assets/posters/5_bright@2x.jpg'),
      video: require('assets/videos/five.mp4'),
      videoDesktop: require('assets/videos/fiveDesk.mp4'),
      bubbles: [
        // Can you work on Friday?
        {
          key: '1',
          scene: 'both',
          timestamp: 7.11,
          duration: 4,
          type: 'incoming',
          msg: intl.formatMessage({ id: 'steps.five.bubbles.work' }),
          seen: {
            dark: false,
            light: false,
          },
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
          scene: 'both',
          timestamp: 25.17,
          duration: 5,
          type: 'reply',
          msg: {
            dark: intl.formatMessage({ id: 'steps.five.bubbles.yes' }),
            light: intl.formatMessage({ id: 'steps.five.bubbles.no' }),
          },
        },
      ],
    },
    {
      num: 6,
      title: intl.formatMessage({ id: 'steps.six.title' }),
      text: intl.formatMessage({ id: 'steps.six.text' }),
      poster: require('assets/posters/6_bright@2x.jpg'),
      video: require('assets/videos/six.mp4'),
      videoDesktop: require('assets/videos/sixDesk.mp4'),
    },
    {
      num: 7,
      title: intl.formatMessage({ id: 'steps.seven.title' }),
      text: intl.formatMessage({ id: 'steps.seven.text' }),
      poster: require('assets/posters/7_bright@2x.jpg'),
      video: require('assets/videos/seven.mp4'),
      videoDesktop: require('assets/videos/sevenDesk.mp4'),
    },
    {
      num: 8,
      title: intl.formatMessage({ id: 'steps.eight.title' }),
      text: intl.formatMessage({ id: 'steps.eight.text' }),
      poster: require('assets/posters/8_bright@2x.jpg'),
      video: require('assets/videos/eight.mp4'),
      videoDesktop: require('assets/videos/eightDesk.mp4'),
    },
    {
      num: 9,
      title: intl.formatMessage({ id: 'steps.nine.title' }),
      text: intl.formatMessage({ id: 'steps.nine.text' }),
      poster: require('assets/posters/9_bright@2x.jpg'),
      video: require('assets/videos/nine.mp4'),
      videoDesktop: require('assets/videos/nineDesk.mp4'),
    },
    {
      num: 10,
      title: intl.formatMessage({ id: 'steps.ten.title' }),
      text: intl.formatMessage({ id: 'steps.ten.text' }),
      poster: require('assets/posters/10_bright@2x.jpg'),
      video: require('assets/videos/ten.mp4'),
      videoDesktop: require('assets/videos/tenDesk.mp4'),
      bubbles: [
        {
          key: '10',
          scene: 'both',
          timestamp: 3.15,
          duration: 8.5,
          type: 'incoming',
          msg: intl.formatMessage({ id: 'steps.ten.bubbles.coming' }),
          seen: {
            dark: false,
            light: false,
          },
        },
        {
          key: '22',
          scene: 'dark',
          timestamp: 13,
          duration: 5,
          type: 'call',
          msg: intl.formatMessage({ id: 'steps.ten.bubbles.call' }),
        },
        {
          key: '60',
          scene: 'dark',
          timestamp: 26.15,
          duration: 12,
          type: 'incoming',
          msg: intl.formatMessage({ id: 'steps.ten.bubbles.ok' }),
        },
        {
          key: '65',
          scene: 'dark',
          timestamp: 32.15,
          duration: 6,
          type: 'reply-erase',
          msg: intl.formatMessage({ id: 'steps.ten.bubbles.no' }),
        },
        // {
        //  key: '25',
        //  scene: 'both',
        //  timestamp: 19,
        //  duration: 3,
        //  type: 'typing',
        // },
        {
          key: '20',
          scene: 'light',
          timestamp: 11.17,
          duration: 12.83,
          type: 'reply',
          msg: intl.formatMessage({ id: 'steps.ten.bubbles.not-coming' }),
        },
        {
          key: '30',
          scene: 'light',
          timestamp: 18,
          duration: 6,
          type: 'incoming',
          msg: intl.formatMessage({ id: 'steps.ten.bubbles.1717' }),
        },
        {
          key: '75',
          scene: 'light',
          timestamp: 30,
          duration: 12,
          type: 'browser',
        },
        {
          key: '70',
          scene: 'light',
          timestamp: 32,
          duration: 10,
          type: 'reply',
          theme: '1717',
          msg: intl.formatMessage({ id: 'steps.ten.bubbles.not-feeling-good' }),
        },
        {
          key: '50',
          scene: 'light',
          timestamp: 34,
          duration: 8,
          type: 'typing',
        },
      ],
    },
  ];

  return (
    <>

      <Loader
        resources={steps.map((x) => ({ src: x.poster, type: 'image' }))}
        title={intl.formatMessage({ id: 'title' })}
      >
        {() => <Steps initialStep={initialStep} list={steps} title={intl.formatMessage({ id: 'title' })} />}
      </Loader>
    </>
  );
});
