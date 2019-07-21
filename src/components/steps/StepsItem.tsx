import React, { useEffect } from 'react';
import { injectIntl, Link } from 'gatsby-plugin-intl';
import { useInView } from 'react-intersection-observer';

import { Container } from 'components/container/Container';
import { InlineMarkdown } from 'components/inline-markdown/InlineMarkdown';
import { AppContext } from 'components/app-layout/AppLayout';

import s from './StepsItem.scss';

interface IProps {
  intl: any;
  count: string;
  link: string;
  text: string;
  media: string;
  index: number;
  setActive: (args: number) => void;
}

export const StepsItem = injectIntl(({ count, link, text, media, intl, setActive, index }: IProps) => {
  const { mouseEnter, mouseLeave } = React.useContext(AppContext);
  const threshold = 0.5;
  const [ref, active] = useInView({ threshold });

  const handleMouseEnter = () => {
    mouseEnter(intl.formatMessage({ id: 'step_watch' }));
  };

  const handleMouseLeave = () => {
    mouseLeave();
  };

  const handleClick = () => {
    mouseLeave();
  };

  useEffect(() => {

    if (active) {
      setActive(index);
      // console.log(active, index);
    }

  }, [active]);

  return (
    <div className={s.stepsItem} ref={ref}>
      <Container>
        <Link
          className={s.stepsItem__wrapper}
          to={link}
          onClick={handleClick}
        >
          <div className={s.stepsItem__content}>
            <span className={s.stepsItem__count}>{count}</span>

            <span className={s.stepsItem__link}>
              <InlineMarkdown source={text} />
            </span>
          </div>

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
