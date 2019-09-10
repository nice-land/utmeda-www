import * as React from 'react';
import { injectIntl } from 'gatsby-plugin-intl';

import { Helmet } from 'components/helmet/Helmet';
import { StepsContainer } from 'components/steps/StepsContainer';

interface IProps {
  intl: any;
}

function four({ intl }: IProps) {
  const socialTitle = intl.formatMessage({ id: 'steps.four.socialTitle' });
  const text = intl.formatMessage({ id: 'steps.four.text' });
  const socialPoster: string = require('assets/posters/4_bright@2x.jpg');

  return (
    <>
      <Helmet title={socialTitle} description={text} image={socialPoster} />
      <StepsContainer initialStep={4} />
    </>
  );
}

export default injectIntl(four);
