import * as React from 'react';
import { injectIntl, Link, FormattedMessage } from 'gatsby-plugin-intl';

import { Container } from 'components/container/Container';
import { Row } from 'components/row/Row';
import { Video } from 'components/video/Video';
import { InlineMarkdown } from 'components/inline-markdown/InlineMarkdown';

import s from './Step.scss';

const domain = process.env.GATSBY_DOMAIN || '';

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

  const encodedTitle = encodeURIComponent(`${title.replace(/_/g, '')} #utmeda`); // strip markdown ¯\_(ツ)_/¯
  const url = `${domain}/${num}`;

  const twitterLink = `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${url}`;
  const facebookLink = `https://www.facebook.com/sharer/sharer.php?u=${url}`;

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
        <Row>
          <div className={s.step__share}>
            <a className={s(s.step__shareLink, s.twitter)} href={twitterLink} target="_new">
              <span className={s.step__shareLabel}>
                <FormattedMessage id="share.twitter" defaultMessage="Share on Twitter" />
              </span>
            </a>
            <a className={s(s.step__shareLink, s.facebook)} href={facebookLink} target="_new">
              <span className={s.step__shareLabel}>
                <FormattedMessage id="share.facebook" defaultMessage="Share on Facebook" />
              </span>
            </a>
          </div>
        </Row>
      </div>
    </Container>
  );
});
