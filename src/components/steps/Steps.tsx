import * as React from 'react';

import { injectIntl, Link, FormattedMessage } from 'gatsby-plugin-intl';

import { Container } from 'components/container/Container';
import { ScrollWrapper } from 'components/scroll-wrapper/ScrollWrapper';

import s from './Steps.scss';

interface IProps {
  list: string[];
}
// todo rename Step
export const Steps = ({ list }: IProps) => {
  return (
    <ScrollWrapper>
      {list.map((step, i) => {
        const count = (i + 1).toString();
        return (
          <div key={i} className={s.step}>
          <Container>
            <span>{count.padStart(2, '0')}</span>
            <Link className={s.step__link} to={`/${i + 1}`}>
              {step}
            </Link>
          </Container>
        </div>
      ); })};
    </ScrollWrapper>
  );
};
