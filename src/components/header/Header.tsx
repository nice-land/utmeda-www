import React, { Children } from 'react';
import { Link } from 'gatsby-plugin-intl';

import { Logo } from 'components/logo/Logo';

import s from './Header.scss';

interface IHeaderProps {
  children: React.ReactNode;
}

export const Header = ({ children }: IHeaderProps) => (
  <header className={s.header}>
    <div className={s.header__container}>
      <div className={s.header__content}>
        <Link
          to="/"
          className={s.header__link}
        >
          <Logo />
        </Link>

        <ul className={s.header__navigation}>
          {Children.toArray(children).map((child: any, i: number) => (
            <li key={i} className={s.header__item}>{child}</li>
          ))}
        </ul>
      </div>
    </div>
  </header>
);
