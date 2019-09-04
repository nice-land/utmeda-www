import * as React from 'react';
import { injectIntl } from 'gatsby-plugin-intl';

import { IStep } from 'utils/interfaces';
import { Steps } from 'components/steps/Steps';
import { Helmet } from 'components/helmet/Helmet';

interface IProps {
  intl: any;
}

function index({ intl }: IProps) {
  const steps: IStep[] = [
    { num: 1, title: intl.formatMessage({ id: 'steps.one.title' }), poster: require('assets/posters/1_bright@2x.jpg') },
    { num: 2, title: intl.formatMessage({ id: 'steps.two.title' }), poster: require('assets/posters/2_bright@2x.jpg') },
    { num: 3, title: intl.formatMessage({ id: 'steps.three.title' }), poster: require('assets/posters/3_bright@2x.jpg') },
    { num: 4, title: intl.formatMessage({ id: 'steps.four.title' }), poster: require('assets/posters/4_bright@2x.jpg') },
    { num: 5, title: intl.formatMessage({ id: 'steps.five.title' }), poster: require('assets/posters/5_bright@2x.jpg') },
    { num: 6, title: intl.formatMessage({ id: 'steps.six.title' }), poster: require('assets/posters/6_bright@2x.jpg') },
    { num: 7, title: intl.formatMessage({ id: 'steps.seven.title' }), poster: require('assets/posters/7_bright@2x.jpg') },
    { num: 8, title: intl.formatMessage({ id: 'steps.eight.title' }), poster: require('assets/posters/8_bright@2x.jpg') },
    { num: 9, title: intl.formatMessage({ id: 'steps.nine.title' }), poster: require('assets/posters/9_bright@2x.jpg') },
    { num: 10, title: intl.formatMessage({ id: 'steps.ten.title' }), poster: require('assets/posters/10_bright@2x.jpg') },
  ];

  return (
    <>
      <Helmet title={intl.formatMessage({ id: 'title' })} />
      <Steps title={intl.formatMessage({ id: 'title' })} list={steps} />
    </>
  );
}

export default injectIntl(index);
