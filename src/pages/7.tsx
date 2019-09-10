import * as React from 'react';
import { injectIntl } from 'gatsby-plugin-intl';

import { Helmet } from 'components/helmet/Helmet';
import { StepsContainer } from 'components/steps/StepsContainer';

interface IProps {
  intl: any;
}

function one({ intl }: IProps) {
  const socialTitle = intl.formatMessage({ id: 'steps.seven.socialTitle' });
  const text = intl.formatMessage({ id: 'steps.seven.text' });
  const socialPoster: string = require('assets/posters/7_bright@2x.jpg');

  return (
    <>
      <Helmet title={socialTitle} description={text} image={socialPoster} />
      <StepsContainer initialStep={7} />
    </>
  );
}

export default injectIntl(one);
