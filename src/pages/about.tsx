import * as React from 'react';
import Helmet from 'react-helmet';

import { FormattedMessage, injectIntl } from 'gatsby-plugin-intl';

interface IProps {
  intl: any;
}

const About = ({ intl }: IProps) => {
  const title = intl.formatMessage({ id: 'about.title' });

  return (
    <>
      <Helmet title={title} />

        <h3>
          <FormattedMessage id="about.title" defaultMessage="Um Útmeða" />
        </h3>
        <p>
          <FormattedMessage id="about.intro" />
        </p>
    </>
  );
};

export default injectIntl((props: IProps) => (
  <About {...props} />
));
