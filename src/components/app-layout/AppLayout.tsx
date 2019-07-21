import * as React from 'react';

import { Header } from 'components/header/Header';
import { Language } from 'components/language/Language';
import { Devtools } from 'components/devtools/Devtools';
import { PhoneBubble } from 'components/phone-bubble/PhoneBubble';

import s from './AppLayout.scss';

interface IAppLayoutProps {
  children: React.ReactNode;
}

const isDev = process.env.NODE_ENV === 'development';

export default ({ children }: IAppLayoutProps) => (
  <div className={s.layout}>
    <Header>
      <Language />
    </Header>

    {children}
    <PhoneBubble url="https://utmeda.is" />

    {isDev && <Devtools />}
  </div>
);
