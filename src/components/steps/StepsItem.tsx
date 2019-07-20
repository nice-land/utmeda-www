import * as React from 'react';
import { Link } from 'gatsby-plugin-intl';

import { Container } from 'components/container/Container';
import { InlineMarkdown } from 'components/inline-markdown/InlineMarkdown';

import s from './stepsItem.scss';

interface IProps {
  count: string;
  link: string;
  text: string;
  media: string;
}

export const StepsItem = ({ count, link, text, media }: IProps) => {
  return (
    <div className={s.stepsItem}>
      <Container>
        <div className={s.steps__content}>
          <span className={s.steps__count}>{count}</span>
          <Link className={s.steps__link} to={link}>
            <InlineMarkdown source={text} />
          </Link>
        </div>

        <div className={s.stepsItem__media}>
          <img src={media} alt="" />
        </div>
    </Container>
  </div>
  );
};
