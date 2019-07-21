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
    { num: 1, title: intl.formatMessage({ id: 'steps.one.title' }), poster: require('assets/posters/one.jpg') },
    { num: 2, title: intl.formatMessage({ id: 'steps.two.title' }), poster: require('assets/posters/two.jpg') },
    { num: 3, title: intl.formatMessage({ id: 'steps.three.title' }), poster: require('assets/posters/three.jpg') },
    { num: 4, title: intl.formatMessage({ id: 'steps.four.title' }), poster: require('assets/posters/four.jpg') },
    { num: 5, title: intl.formatMessage({ id: 'steps.five.title' }), poster: require('assets/posters/five.jpg') },
    { num: 6, title: intl.formatMessage({ id: 'steps.six.title' }), poster: require('assets/posters/six.jpg') },
    { num: 7, title: intl.formatMessage({ id: 'steps.seven.title' }), poster: require('assets/posters/seven.jpg') },
    { num: 8, title: intl.formatMessage({ id: 'steps.eight.title' }), poster: require('assets/posters/eight.jpg') },
    { num: 9, title: intl.formatMessage({ id: 'steps.nine.title' }), poster: require('assets/posters/nine.jpg') },
    { num: 10, title: intl.formatMessage({ id: 'steps.ten.title' }), poster: require('assets/posters/ten.jpg') },
  ];

  return (
    <>
      <Helmet title={intl.formatMessage({ id: 'title' })} />
      <Steps list={steps} />
    </>
  );
}

export default injectIntl(index);
