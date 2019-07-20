import * as React from 'react';
import { Link } from 'gatsby-plugin-intl';

import { Container } from 'components/container/Container';

import s from './Steps.scss';

interface IProps {
  count: string;
  link: string;
  text: React.ReactNode | string;
  media: string;
}

export const StepsItem = ({ count, link, text, media }: IProps) => {
  return (
    <div className={s.steps}>
      <Container>

      <div className={s.steps__content}>
        <span className={s.steps__count}>{count}</span>
        <Link className={s.steps__link} to={link}>
          {text}
        </Link>
      </div>

      <div className={s.steps__media}>
        <img src={media} alt="" />
      </div>
    </Container>
  </div>
  );
};
