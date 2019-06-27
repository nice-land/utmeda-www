import * as React from 'react';
import Helmet from 'react-helmet';
import { injectIntl } from 'gatsby-plugin-intl';

import { Step } from 'components/step/Step';

interface IProps {
  intl: any;
}

function three({ intl }: IProps) {
  return (
    <>
      <Helmet title={intl.formatMessage({ id: 'step_three_title' })} />

      <Step
        num={3}
        title={intl.formatMessage({ id: 'step_three_title' })}
        text={intl.formatMessage({ id: 'step_three_text' })}
        video={''}
      />
    </>
  );
}

export default injectIntl(three);
