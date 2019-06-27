import * as React from 'react';
import Helmet from 'react-helmet';
import { injectIntl } from 'gatsby-plugin-intl';

import { Step } from 'components/step/Step';

interface IProps {
  intl: any;
}

function two({ intl }: IProps) {
  return (
    <>
      <Helmet title={intl.formatMessage({ id: 'step_two_title' })} />

      <Step
        num={2}
        title={intl.formatMessage({ id: 'step_two_title' })}
        text={intl.formatMessage({ id: 'step_two_text' })}
        video={''}
      />
    </>
  );
}

export default injectIntl(two);
