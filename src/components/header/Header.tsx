import React, { Children, useContext } from 'react';
import { Link } from 'gatsby-plugin-intl';

import { useMobile } from 'hooks/use-mobile';
import { Logo } from 'components/logo/Logo';
import { AppContext } from 'components/app-layout/AppLayout';
import { PhoneBubble } from 'components/phone-bubble/PhoneBubble';

import s from './Header.scss';

interface IHeaderProps {
  children: React.ReactNode;
}

export const Header = ({ children }: IHeaderProps) => {
  const context = useContext(AppContext) as any;
  const isMobile = useMobile();

  const handleClick = e => {
    e.preventDefault();

    context.setActiveStep(null);
  };

  return (
    <header className={s.header}>
      <div className={s.header__container}>
        <div className={s.header__content}>
          <div className={s.header__inline}>
            <Link to="/" className={s.header__link} onClick={handleClick}>
              <Logo />
            </Link>

            {isMobile && <PhoneBubble position="relative" url="https://utmeda.is" />}
          </div>

          <ul className={s.header__navigation}>
            {Children.toArray(children).map((child: any, i: number) => (
              <li key={i} className={s.header__item}>
                {child}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </header>
  );
};
