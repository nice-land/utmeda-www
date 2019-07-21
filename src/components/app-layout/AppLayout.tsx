import * as React from 'react';

import { Link, FormattedMessage } from 'gatsby-plugin-intl';

import { Header } from 'components/header/Header';
import { Language } from 'components/language/Language';
import { Devtools } from 'components/devtools/Devtools';
import { PhoneBubble } from 'components/phone-bubble/PhoneBubble';
import { MouseFollow } from 'components/mouse-follow/MouseFollow';

import s from './AppLayout.scss';

interface IAppLayoutProps {
  children: React.ReactNode;
}

const isDev = process.env.NODE_ENV === 'development';
export const AppContext = React.createContext({}) as any;

export default ({ children }: IAppLayoutProps) => {
  const [mouseText, setMouseText] = React.useState<undefined | string | string[]>();
  const [isMediaHovered, setMediaHovered] = React.useState(false);

  const mouseEnter = (val?: string | undefined) => {
    if (val) {
      setMouseText(val);
    }

    setMediaHovered(true);
  };

  const mouseLeave = () => {
    setMouseText(undefined);
    setMediaHovered(false);
  };

  return (
    <div className={s.layout}>
      <Header>
        <Link to="/">
          <FormattedMessage id="navigation.steps" defaultMessage="Skrefin" />
        </Link>
        <Link to="/about">
          <FormattedMessage id="navigation.about" defaultMessage="Um átakið" />
        </Link>
        <Language />
      </Header>

      <AppContext.Provider
        value={{
          mouseText,
          isMediaHovered,
          setMouseText,
          mouseEnter,
          mouseLeave,
        }}
      >
        <MouseFollow />
        <PhoneBubble url="https://utmeda.is" />
        {children}
      </AppContext.Provider>

      {isDev && <Devtools />}
    </div>
  );
};
