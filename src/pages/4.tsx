import * as React from 'react';
import { injectIntl } from 'gatsby-plugin-intl';

import { Step } from 'components/step/Step';
import { Helmet } from 'components/helmet/Helmet';

interface IProps {
  intl: any;
}

function one({ intl }: IProps) {
  const title = intl.formatMessage({ id: 'step_four_title' });
  const text = intl.formatMessage({ id: 'step_four_text' });
  const video: string = require('assets/videos/four.mp4');

  return (
    <>
      <Helmet
        title={title}
        description={text}
      />

      <Step
        num={4}
        title={title}
        text={text}
        video={video}
      />
    </>
  );
}

export default injectIntl(one);
