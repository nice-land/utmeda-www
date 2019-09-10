import * as React from 'react';
import { injectIntl } from 'gatsby-plugin-intl';

import { Helmet } from 'components/helmet/Helmet';
import { StepsContainer } from 'components/steps/StepsContainer';

interface IProps {
  intl: any;
}

function three({ intl }: IProps) {
  const socialTitle = intl.formatMessage({ id: 'steps.three.socialTitle' });
  const text = intl.formatMessage({ id: 'steps.three.text' });
  const socialPoster: string = require('assets/posters/share/3.jpg');

  return (
    <>
      <Helmet title={socialTitle} description={text} image={socialPoster} />
      <StepsContainer initialStep={3} />
    </>
  );
}

export default injectIntl(three);
