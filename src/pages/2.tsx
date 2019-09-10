import * as React from 'react';
import { injectIntl } from 'gatsby-plugin-intl';

import { Helmet } from 'components/helmet/Helmet';
import { StepsContainer } from 'components/steps/StepsContainer';

interface IProps {
  intl: any;
}

function one({ intl }: IProps) {
  const socialTitle = intl.formatMessage({ id: 'steps.two.socialTitle' });
  const text = intl.formatMessage({ id: 'steps.two.text' });
  const socialPoster: string = require('assets/posters/share/2.jpg');

  return (
    <>
      <Helmet title={socialTitle} description={text} image={socialPoster} />
      <StepsContainer initialStep={2} />
    </>
  );
}

export default injectIntl(one);
