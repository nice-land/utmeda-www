import React from 'react';
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
  index: number;
  
}

export const StepsItem = injectIntl(({ count, link, text }: IProps) => {
  const { mouseLeave } = React.useContext(AppContext);
  

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
        </Link>
      </Container>
    </div>
  );
});
