import * as React from 'react';
import Helmet from 'react-helmet';
import { injectIntl } from 'gatsby-plugin-intl';

import { Step } from 'components/step/Step';

interface IProps {
  intl: any;
}

function six({ intl }: IProps) {
  return (
    <>
      <Helmet title={intl.formatMessage({ id: 'step_six_title' })} />

      <Step
        num={6}
        title={intl.formatMessage({ id: 'step_six_title' })}
        text={intl.formatMessage({ id: 'step_six_text' })}
        video={''}
      />
    </>
  );
}

export default injectIntl(six);
