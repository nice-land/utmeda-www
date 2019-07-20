import * as React from 'react';
import { injectIntl, Link } from 'gatsby-plugin-intl';

import { Container } from 'components/container/Container';
import { Row } from 'components/row/Row';
import { Video } from 'components/video/Video';
import { InlineMarkdown } from 'components/inline-markdown/InlineMarkdown';

import s from './Step.scss';

interface IProps {
  num: number;
  title: string;
  text: string;
  video: string;
  intl: any;
}

export const Step = injectIntl(({ num, title, text, video, intl }: IProps) => {
  const steps = [
    intl.formatMessage({ id: 'step_one_title' }),
    intl.formatMessage({ id: 'step_two_title' }),
    intl.formatMessage({ id: 'step_three_title' }),
    intl.formatMessage({ id: 'step_four_title' }),
    intl.formatMessage({ id: 'step_five_title' }),
    intl.formatMessage({ id: 'step_six_title' }),
    intl.formatMessage({ id: 'step_seven_title' }),
    intl.formatMessage({ id: 'step_eight_title' }),
    intl.formatMessage({ id: 'step_nine_title' }),
    intl.formatMessage({ id: 'step_ten_title' }),
  ];

  const nextNum = num === steps.length ? 1 : num + 1;
  const nextStep = num === steps.length ? steps[0] : steps[num];

  return (
    <Container>
      <div className={s.step}>
        <Row>
          <div className={s.step__col}>
            <h2 className={s.step__header}>{num}. <InlineMarkdown source={title} /></h2>
            <p className={s.step__text}><InlineMarkdown source={text} /></p>
            <Video video={video} />
          </div>
        </Row>
        <Row>
          <div className={s.step__col}>
            <Link to={`/${nextNum}`}>{nextNum}. {nextStep}</Link>
          </div>
        </Row>
      </div>
    </Container>
  );
});
