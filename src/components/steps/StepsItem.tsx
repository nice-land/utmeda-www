import * as React from 'react';
import { injectIntl, Link } from 'gatsby-plugin-intl';

import { Container } from 'components/container/Container';
import { AppContext } from 'components/app-layout/AppLayout';

import { Content } from './Content';
import s from './StepsItem.scss';

interface IProps {
  intl: any;
  count: string;
  link: string;
  text: string;
  media: string;
}

export const StepsItem = injectIntl(({ count, link, text, media, intl }: IProps) => {
  const { mouseEnter, mouseLeave } = React.useContext(AppContext);

  const handleMouseEnter = () => {
    mouseEnter(intl.formatMessage({ id: 'step_watch' }));
  };

  const handleMouseLeave = () => {
    mouseLeave();
  };

  const handleClick = () => {
    mouseLeave();
  };

  return (
    <div className={s.stepsItem}>
      <Container>
        <Link
          className={s.stepsItem__wrapper}
          to={link}
          onClick={handleClick}
        >
          <Content
            count={count}
            text={text}
          />

          <div
            className={s.stepsItem__media}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <img src={media} alt="" />
          </div>
        </Link>
      </Container>
    </div>
  );
});
