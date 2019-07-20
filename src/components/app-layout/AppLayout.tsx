import * as React from 'react';
import Helmet from 'react-helmet';

import { helmet } from 'utils/helmet';
import { Header } from 'components/header/Header';
import { Language } from 'components/language/Language';

// import { Footer } from 'components/footer/Footer';
import { Devtools } from 'components/devtools/Devtools';

import s from './AppLayout.scss';

interface IAppLayoutProps {
  children: React.ReactNode;
}

const isDev = process.env.NODE_ENV === 'development';

export default ({ children }: IAppLayoutProps) => (
  <div className={s.layout}>
    <Helmet {...helmet} />

    <Header>
      <Language />
    </Header>

    {children}

    {/* <Footer
      social={[
        { icon: <Twitter />, to: 'https://twitter.com/' },
        { icon: <Instagram />, to: 'https://www.instagram.com/' },
        { icon: <Facebook />, to: 'https://www.facebook.com/' },
      ]}
    /> */}

    {isDev && <Devtools />}
  </div>
);
