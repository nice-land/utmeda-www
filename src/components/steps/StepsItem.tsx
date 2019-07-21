import * as React from 'react';
import { Link } from 'gatsby-plugin-intl';

import { Container } from 'components/container/Container';
import { InlineMarkdown } from 'components/inline-markdown/InlineMarkdown';

import s from './StepsItem.scss';

interface IProps {
  count: string;
  link: string;
  text: string;
  media: string;
}

export const StepsItem = ({ count, link, text, media }: IProps) => (
  <div className={s.stepsItem}>
    <Container>
      <div className={s.stepsItem__content}>
        <span className={s.stepsItem__count}>{count}</span>

        <Link className={s.stepsItem__link} to={link}>
          <InlineMarkdown source={text} />
        </Link>
      </div>

      <div className={s.stepsItem__media}>
        <img src={media} alt="" />
      </div>
  </Container>
  </div>
);
