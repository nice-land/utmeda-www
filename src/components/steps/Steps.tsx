import React, { useContext, useState, useEffect } from 'react';
import { debounce } from 'lodash';

import { IStep } from 'utils/interfaces';
import { useMobile } from 'hooks/use-mobile';
import Slider from 'components/slider/Slider';
import { AppContext } from 'components/app-layout/AppLayout';

import { StepsItem } from './StepsItem';
import s from './Steps.scss';

interface IProps {
  title: string;
  initialStep?: number;
  list: IStep[];
}

export const Steps = ({ title, list, initialStep }: IProps) => {
  const context = useContext(AppContext) as any;
  const isMobile = useMobile();
  const offset = isMobile ? 0.85 : 0.75;

  const [width, setWidth] = useState(
    typeof window === 'undefined' ? 720 : window.innerWidth * offset,
  );

  const handleResize = debounce(() => {
    setWidth(window.innerWidth * offset);
  }, 200);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    if (initialStep) {
      const initialTitle = list && list[initialStep] && list[initialStep].title;
      setTimeout(() => context.setActiveStep(initialStep, initialTitle), 500);
    }

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <Slider
      items={[{}, ...list]}
      active={context.activeStep}
      width={width}
      visible={1.3}
    >
      {(step: any, i: number, a: boolean, x: any) =>
        i === 0 ? (
          <div className={s.steps__title}>
            <h1 className={s.steps__titleContent}>{title}</h1>
          </div>
        ) : (
          <StepsItem
            key={i}
            index={i}
            title={step.title}
            text={step.text}
            count={i.toString().padStart(2, '0')}
            link={`/${i}`}
            media={step.poster}
            spring={x}
            video={step.video}
            videoDesktop={step.videoDesktop}
            bubbles={step.bubbles}
            active={a}
            onClose={() => context.setActiveStep(null, title)}
            onClick={() => context.setActiveStep(i, step.title)}
            next={list[i]} // a bit weird, but we have an edge case for the title, which "is" the first element in the list
          />
        )
      }
    </Slider>
  );
};
