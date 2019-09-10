import * as React from 'react';
import { injectIntl } from 'gatsby-plugin-intl';

import { Helmet } from 'components/helmet/Helmet';
import { StepsContainer } from 'components/steps/StepsContainer';

interface IProps {
  intl: any;
}

function ten({ intl }: IProps) {
  const socialTitle = intl.formatMessage({ id: 'steps.ten.socialTitle' });
  const text = intl.formatMessage({ id: 'steps.ten.text' });
  const socialPoster: string = require('assets/posters/10_bright@2x.jpg');

  return (
    <>
      <Helmet title={socialTitle} description={text} image={socialPoster} />
      <StepsContainer initialStep={10} />
    </>
  );
}

export default injectIntl(ten);
