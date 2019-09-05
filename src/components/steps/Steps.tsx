import * as React from 'react';
import { Canvas } from 'components/canvas/Canvas';
import { injectIntl } from 'gatsby-plugin-intl';
import { IStep } from 'utils/interfaces';
import { navigate } from 'gatsby';
import { TweenLite, Power4 } from 'gsap';
import { useKeyDown } from 'hooks/use-keydown';
import { AppContext } from 'components/app-layout/AppLayout';
import { debounce } from 'lodash';

import { Controller } from './Controller';
import { StepPoster } from './StepPoster';
import { StepsItem } from './StepsItem';
import s from './Steps.scss';

interface IProps {
  title: string;
  list: IStep[];
  intl: any;
}

interface IState {
  active: number;
}

export const Steps = injectIntl(({ intl, title, list }: IProps) => {
  const keys = useKeyDown([39, 37]);
  const [state, set] = React.useState<IState>({ active: 0 });
  const [leaving, setLeaving] = React.useState(false);

  const parentRef = React.useRef<HTMLDivElement>(null);
  const { mouseEnter, mouseLeave } = React.useContext(AppContext);

  React.useEffect(() => {
    if (keys.includes(37)) {
      set({ active: Math.max(0, state.active - 1) });
    } else if (keys.includes(39) || keys.includes(32)) {
      set({ active: Math.min(list.length - 1, state.active + 1) });
    }
  }, [keys]);

  React.useEffect(() => {
    TweenLite.to(parentRef.current!, 1, {
      scrollTo: { x: state.active * window.innerWidth },
      ease: Power4.easeInOut,
    });
  }, [state]);

  const handleScroll = debounce(() => {
    if (parentRef.current) {
      set({
        active: Math.round(parentRef.current!.scrollLeft / window.innerWidth),
      });
    }
  }, 1000);

  React.useEffect(() => {
    if (!parentRef.current) {
      return;
    }

    parentRef.current!.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleScroll);
    return () => {
      parentRef.current!.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [parentRef.current]);

  const handleMouseDown = (index: number) => {
    setLeaving(true);
    setTimeout(() => navigate(`/${index}`), 1000);
  };

  return (
    <div className={s(s.steps, { leaving })}>
      <div className={s.steps__canvas}>
        <Canvas orthographic={true}>
          <Controller container={parentRef.current!} />
          {list.map((step, i) => (
            <StepPoster
              stepWatchText={intl.formatMessage({ id: 'step_watch' })}
              key={step.num}
              index={i}
              poster={step.poster}
              active={i === state.active}
              mouseEnter={mouseEnter}
              mouseDown={() => handleMouseDown(step.num)}
              mouseLeave={mouseLeave}
            />
          ))}
        </Canvas>
      </div>
      {/* <div className={s.steps__title}>
        <h1 className={s.steps__titleContent}>{title}</h1>
      </div> */}
      <div ref={parentRef} className={s.steps__inner}>
        {list.map((step, i) => (
          <div key={i} className={s.steps__step}>
            <StepsItem
              key={i}
              index={i}
              text={step.title}
              count={(i + 1).toString().padStart(2, '0')}
              link={`/${i + 1}`}
              onClick={() => handleMouseDown(step.num)}
              media={step.poster}
            />
          </div>
        ))}
      </div>
    </div>
  );
});
