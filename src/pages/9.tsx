import * as React from 'react';
import Helmet from 'react-helmet';
import { injectIntl } from 'gatsby-plugin-intl';

import { Step } from 'components/step/Step';

interface IProps {
  intl: any;
}

function nine({ intl }: IProps) {
  return (
    <>
      <Helmet title={intl.formatMessage({ id: 'step_nine_title' })} />

      <Step
        num={9}
        title={intl.formatMessage({ id: 'step_nine_title' })}
        text={intl.formatMessage({ id: 'step_nine_text' })}
        video={''}
      />
    </>
  );
}

export default injectIntl(nine);
