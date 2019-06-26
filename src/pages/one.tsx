import * as React from 'react';
import Helmet from 'react-helmet';
import { injectIntl, Link, FormattedMessage } from 'gatsby-plugin-intl';

import { Language } from 'components/language/Language';
import { Intro } from 'components/intro/Intro';

const one = ({ intl }) => (
  <>
    <Helmet title="About" />

    <Intro>
      <Language />
      <FormattedMessage id="title" />
    </Intro>
  </>
);

export default injectIntl(one);
