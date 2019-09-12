import * as React from 'react';
import { injectIntl } from 'gatsby-plugin-intl';

import { Helmet } from 'components/helmet/Helmet';
import { StepsContainer } from 'components/steps/StepsContainer';

interface IProps {
  intl: any;
}

function eight({ intl }: IProps) {
  const socialTitle = intl.formatMessage({ id: 'steps.eight.socialTitle' });
  const text = intl.formatMessage({ id: 'steps.eight.text' });
  const socialPoster: string = require('assets/posters/share/8.jpg');

  return (
    <>
      <Helmet title={socialTitle} description={text} image={socialPoster} />
      <StepsContainer initialStep={8} />
    </>
  );
}

export default injectIntl(eight);
