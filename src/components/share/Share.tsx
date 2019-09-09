import * as React from 'react';
import { FormattedMessage } from 'gatsby-plugin-intl';
import { animated } from 'react-spring';

import Twitter from 'assets/svg/twitter.svg';
import Facebook from 'assets/svg/facebook.svg';

import s from './Share.scss';

interface IShareProps {
  title: string;
  num: number;
  style?: any;
}

const domain = process.env.GATSBY_DOMAIN || '';

export const Share = ({ title, num, style }: IShareProps) => {
  const encodedTitle = encodeURIComponent(`${title.replace(/_/g, '')} #utmeda`);
  const url = `${domain}/${num}`;
  const twitter = `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${url}`;
  const facebook = `https://www.facebook.com/sharer/sharer.php?u=${url}`;

  const handleClick = (link: string) => {
    window.open(link, '_blank', 'noopener noreferrer');
  };

  return (
    <animated.div className={s.share} style={style}>
      <button
        className={s.share__link}
        onClick={() => handleClick(facebook)}
      >
        <Facebook />
      </button>

      <button
        className={s.share__link}
        onClick={() => handleClick(twitter)}
      >
        <Twitter />
      </button>

      <p className={s.share__copy}>
        <FormattedMessage id="share.copy" />
      </p>
    </animated.div>
  );
};
