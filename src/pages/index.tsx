import * as React from 'react';

import { injectIntl } from 'gatsby-plugin-intl';

import { Steps } from 'components/steps/Steps';
import { Helmet } from 'components/helmet/Helmet';
import { IStep } from 'utils/interfaces';

interface IProps {
  intl: any;
}

function index({ intl }: IProps) {
  const steps: IStep[] = [
    { num: 1, title: intl.formatMessage({ id: 'step_one_title' }), poster: require('assets/posters/one.jpg') },
    { num: 2, title: intl.formatMessage({ id: 'step_two_title' }), poster: require('assets/posters/two.jpg') },
    { num: 3, title: intl.formatMessage({ id: 'step_three_title' }), poster: require('assets/posters/three.jpg') },
    { num: 4, title: intl.formatMessage({ id: 'step_four_title' }), poster: require('assets/posters/four.jpg') },
    { num: 5, title: intl.formatMessage({ id: 'step_five_title' }), poster: require('assets/posters/five.jpg') },
    { num: 6, title: intl.formatMessage({ id: 'step_six_title' }), poster: require('assets/posters/six.jpg') },
    { num: 7, title: intl.formatMessage({ id: 'step_seven_title' }), poster: require('assets/posters/seven.jpg') },
    { num: 8, title: intl.formatMessage({ id: 'step_eight_title' }), poster: require('assets/posters/eight.jpg') },
    { num: 9, title: intl.formatMessage({ id: 'step_nine_title' }), poster: require('assets/posters/nine.jpg') },
    { num: 10, title: intl.formatMessage({ id: 'step_ten_title' }), poster: require('assets/posters/ten.jpg') },
  ];

  return (
    <>
      <Helmet title={intl.formatMessage({ id: 'title' })} />
      <Steps list={steps} />
    </>
  );
}

export default injectIntl(index);
