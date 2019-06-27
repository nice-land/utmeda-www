import * as React from 'react';
import Helmet from 'react-helmet';
import { injectIntl, Link, FormattedMessage } from 'gatsby-plugin-intl';

import { Steps } from 'components/steps/Steps';

interface IProps {
  intl: any;
}

function index({ intl }: IProps) {
  const steps = [
    intl.formatMessage({ id: 'step_one_title' }),
    intl.formatMessage({ id: 'step_two_title' }),
    intl.formatMessage({ id: 'step_three_title' }),
    intl.formatMessage({ id: 'step_four_title' }),
    intl.formatMessage({ id: 'step_five_title' }),
    intl.formatMessage({ id: 'step_six_title' }),
    intl.formatMessage({ id: 'step_seven_title' }),
    intl.formatMessage({ id: 'step_eight_title' }),
    intl.formatMessage({ id: 'step_nine_title' }),
    intl.formatMessage({ id: 'step_ten_title' }),
  ];

  return (
    <>
      <Helmet title={intl.formatMessage({ id: 'title' })} />
      <Steps list={steps} />
    </>
  );
}

export default injectIntl(index);
