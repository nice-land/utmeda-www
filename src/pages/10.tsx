import * as React from 'react';
import Helmet from 'react-helmet';
import { injectIntl } from 'gatsby-plugin-intl';

import { Step } from 'components/step/Step';

interface IProps {
  intl: any;
}

function ten({ intl }: IProps) {
  return (
    <>
      <Helmet title={intl.formatMessage({ id: 'step_ten_title' })} />

      <Step
        num={10}
        title={intl.formatMessage({ id: 'step_ten_title' })}
        text={intl.formatMessage({ id: 'step_ten_text' })}
        video={''}
      />
    </>
  );
}

export default injectIntl(ten);
