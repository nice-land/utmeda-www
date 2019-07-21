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
    intl.formatMessage({ id: 'steps.one.title' }),
    intl.formatMessage({ id: 'steps.two.title' }),
    intl.formatMessage({ id: 'steps.three.title' }),
    intl.formatMessage({ id: 'steps.four.title' }),
    intl.formatMessage({ id: 'steps.five.title' }),
    intl.formatMessage({ id: 'steps.six.title' }),
    intl.formatMessage({ id: 'steps.seven.title' }),
    intl.formatMessage({ id: 'steps.eight.title' }),
    intl.formatMessage({ id: 'steps.nine.title' }),
    intl.formatMessage({ id: 'steps.ten.title' }),
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
                <FormattedMessage id="share.twitter" defaultMessage="Deila á Twitter" />
              </span>
            </a>
            <a className={s(s.step__shareLink, s.facebook)} href={facebookLink} target="_new">
              <span className={s.step__shareLabel}>
                <FormattedMessage id="share.facebook" defaultMessage="Deila á Facebook" />
              </span>
            </a>
          </div>
        </Row>
      </div>
    </Container>
  );
});
