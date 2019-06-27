import * as React from 'react';
import Helmet from 'react-helmet';
import { injectIntl } from 'gatsby-plugin-intl';

import { Step } from 'components/step/Step';

interface IProps {
  intl: any;
}

function four({ intl }: IProps) {
  return (
    <>
      <Helmet title={intl.formatMessage({ id: 'step_four_title' })} />

      <Step
        num={4}
        title={intl.formatMessage({ id: 'step_four_title' })}
        text={intl.formatMessage({ id: 'step_four_text' })}
        video={''}
      />
    </>
  );
}

export default injectIntl(four);
