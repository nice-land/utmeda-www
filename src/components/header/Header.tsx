import React, { Children, useContext } from "react";
import { Link } from "gatsby-plugin-intl";

import { Logo } from "components/logo/Logo";

import s from "./Header.scss";
import { AppContext } from "components/app-layout/AppLayout";

interface IHeaderProps {
  children: React.ReactNode;
}

export const Header = ({ children }: IHeaderProps) => {
  const context = useContext(AppContext) as any;

  const handleClick = e => {
    e.preventDefault();

    context.setActiveStep(null);
  };

  return (
    <header className={s.header}>
      <div className={s.header__container}>
        <div className={s.header__content}>
          <Link to="/" className={s.header__link} onClick={handleClick}>
            <Logo />
          </Link>

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
