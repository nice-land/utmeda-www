import * as React from 'react';

import { injectIntl, Link, FormattedMessage } from 'gatsby-plugin-intl';
import { Container } from 'components/container/Container';
import { Row } from 'components/row/Row';

import s from './Steps.scss';

interface IProps {
  list: string[];
}

export const Steps = ({ list }: IProps) => {
  return (
    <Container>
      <div className={s.steps}>
        <Row>
          <div className={s.steps__col}>
            <ul className={s.steps__list}>
              {list.map((step, i) => (
                <li
                  className={s.steps__step}
                  key={step}
                >
                  <Link className={s.steps__link} to={`/${i + 1}`}>
                    {i + 1}. {step}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </Row>
      </div>
    </Container>
  );
};
