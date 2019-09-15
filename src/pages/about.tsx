import * as React from 'react';
import Helmet from 'react-helmet';

import { injectIntl } from 'gatsby-plugin-intl';
import { Content } from 'components/content/Content';
import { ScrollContainer } from 'components/scroll-container/ScrollContainer';

interface IProps {
  intl: any;
}

const About = ({ intl }: IProps) => {
  const title = intl.formatMessage({ id: 'about.title' });

  return (
    <>
      <Helmet title={title} />
      <ScrollContainer>
        <Content
          noPadding
          titleStyle="bold"
          title={intl.formatMessage({ id: 'about.title' })}
          source={intl.formatMessage({ id: 'about.content' })}
        />
      </ScrollContainer>
    </>
  );
};

export default injectIntl((props: IProps) => <About {...props} />);
