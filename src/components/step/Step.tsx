import * as React from 'react';
import { injectIntl, Link, FormattedMessage } from 'gatsby-plugin-intl';

import Twitter from 'assets/svg/twitter.svg';
import Facebook from 'assets/svg/facebook.svg';

import { Container } from 'components/container/Container';
import { Row } from 'components/row/Row';
import { Video } from 'components/video/Video';
import { InlineMarkdown } from 'components/inline-markdown/InlineMarkdown';
import { Content } from 'components/steps/Content';

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
    <div className={s.step}>
      <div className={s.step__share}>
        <a
          className={s.step__shareLink}
          href={facebookLink}
          target="_new"
        >
          <Facebook />
        </a>

        <a
          className={s.step__shareLink}
          href={twitterLink}
          target="_new"
        >
          <Twitter />
        </a>

        <p className={s.step__shareCopy}><FormattedMessage id="share.copy" /></p>
      </div>

      <div className={s.step__content}>
        <Content
          count={num}
          text={title}
        />
      </div>

      <div className={s.step__video}>
        <Video video={video} />
      </div>

      {/* <div className={s.step__slide}>
        <p className={s.step__text}><InlineMarkdown source={text} /></p>

        <Link to={`/${nextNum}`}>
          <Content
            count={nextNum}
            text={nextStep}
          />
        </Link>
      </div> */}
    </div>
  );
});
