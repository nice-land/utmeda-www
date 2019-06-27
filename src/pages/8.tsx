import * as React from 'react';
import Helmet from 'react-helmet';
import { injectIntl } from 'gatsby-plugin-intl';

import { Step } from 'components/step/Step';

interface IProps {
  intl: any;
}

function eight({ intl }: IProps) {
  return (
    <>
      <Helmet title={intl.formatMessage({ id: 'step_eight_title' })} />

      <Step
        num={8}
        title={intl.formatMessage({ id: 'step_eight_title' })}
        text={intl.formatMessage({ id: 'step_eight_text' })}
        video={''}
      />
    </>
  );
}

export default injectIntl(eight);
