import * as React from 'react';
import Helmet from 'react-helmet';
import { injectIntl } from 'gatsby-plugin-intl';

import { Step } from 'components/step/Step';

interface IProps {
  intl: any;
}

function five({ intl }: IProps) {
  return (
    <>
      <Helmet title={intl.formatMessage({ id: 'step_five_title' })} />

      <Step
        num={5}
        title={intl.formatMessage({ id: 'step_five_title' })}
        text={intl.formatMessage({ id: 'step_five_text' })}
        video={''}
      />
    </>
  );
}

export default injectIntl(five);
