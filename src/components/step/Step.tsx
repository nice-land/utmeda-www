import * as React from 'react';
import { injectIntl, Link, FormattedMessage } from 'gatsby-plugin-intl';
import { TimelineLite, Power4 } from 'gsap';

import Twitter from 'assets/svg/twitter.svg';
import Facebook from 'assets/svg/facebook.svg';

import { Video } from 'components/video/Video';
import { InlineMarkdown } from 'components/inline-markdown/InlineMarkdown';
import { Content } from 'components/steps/Content';
import { ScrollWrapper } from 'components/scroll-wrapper/ScrollWrapper';

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

  const slideRef = React.useRef<HTMLDivElement>(null);
  const nextNum = num === steps.length ? 1 : num + 1;
  const nextStep = num === steps.length ? steps[0] : steps[num];
  const encodedTitle = encodeURIComponent(`${title.replace(/_/g, '')} #utmeda`); // strip markdown ¯\_(ツ)_/¯
  const url = `${domain}/${num}`;
  const twitterLink = `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${url}`;
  const facebookLink = `https://www.facebook.com/sharer/sharer.php?u=${url}`;

  const handleVideoEnd = () => {
    const timeline = new TimelineLite();
    const slide = slideRef.current;
    const ease = Power4.easeInOut;

    if (!slide) {
      return;
    }

    timeline.to(
      slide,
      0.45,
      {
        opacity: 1,
        x: 0,
        ease,
      },
    );
  };

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

      <Video
        video={video}
        onVideoEnd={handleVideoEnd}
      />

      <div
        className={s.step__slide}
        ref={slideRef}
      >
        <ScrollWrapper
          className={s.step__li}
          snap={false}
        >
          <p className={s.step__text}><InlineMarkdown source={text} /></p>

          <Link
            to={`/${nextNum}`}
            className={s.step__link}
          >
            <Content
              count={nextNum}
              text={nextStep}
            />
          </Link>
        </ScrollWrapper>
      </div>
    </div>
  );
});
