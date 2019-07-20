import * as React from 'react';

import s from './Footer.scss';

interface ISocial {
  icon: React.ReactNode;
  to: string;
}

interface IFooterProps {
  social: ISocial[];
}

export const Footer = ({ social }: IFooterProps) => (
  <div className={s.footer}>
    {/* <Container>
      <div className={s.footer__content}>
        <ul className={s.footer__list}>
          {social.map((item) => (
            <li
              key={item.to}
              className={s.footer__item}
            >
              <a
                href={item.to}
                target="_blank"
                rel="noopener noreferrer"
              >
                {item.icon}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </Container> */}
  </div>
);
