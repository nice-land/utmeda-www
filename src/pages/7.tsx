import * as React from 'react';
import Helmet from 'react-helmet';
import { injectIntl } from 'gatsby-plugin-intl';

import { Step } from 'components/step/Step';

interface IProps {
  intl: any;
}

function seven({ intl }: IProps) {
  return (
    <>
      <Helmet title={intl.formatMessage({ id: 'step_seven_title' })} />

      <Step
        num={7}
        title={intl.formatMessage({ id: 'step_seven_title' })}
        text={intl.formatMessage({ id: 'step_seven_text' })}
        video={''}
      />
    </>
  );
}

export default injectIntl(seven);
