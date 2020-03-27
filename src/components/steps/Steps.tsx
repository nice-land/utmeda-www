import React, { useContext, useEffect, useMemo } from 'react';

import { IStep } from 'utils/interfaces';
import { useSlideWidth } from 'hooks/use-slide-width';
import Slider from 'components/slider/Slider';
import FacebookSlider from 'components/slider/FacebookSlider';
import { AppContext } from 'components/app-layout/AppLayout';
import DisplacementMap from 'assets/images/displacementmap.png';
import { isFacebookApp } from 'utils/isFacebook';
import { TextureLoader } from 'three';

import { StepsItem } from './StepsItem';
import s from './Steps.scss';

interface IProps {
  title: string;
  initialStep?: number;
  list: IStep[];
}

export const Steps = ({ title, list, initialStep }: IProps) => {
  const context = useContext(AppContext) as any;
  const width = useSlideWidth();

  const isFb = isFacebookApp();

  const SliderCmp = isFb ? FacebookSlider : Slider;

  useEffect(() => {
    if (initialStep) {
      const initialTitle = list && list[initialStep] && list[initialStep].title;
      setTimeout(() => context.setActiveStep(initialStep, initialTitle), 500);
    }
  }, []);

  const displacementMap = useMemo(() => new TextureLoader().load(DisplacementMap), []);

  return (
    <SliderCmp items={[{}, ...list]} active={context.activeStep} width={width} visible={1.3}>
      {(step: any, i: number, a: boolean, x: any) =>
        i === 0 ? (
          <div className={s.steps__title}>
            <h1
              className={s(s.steps__titleContent, { [s.steps__titleContentSmaller]: title.length > 7 })}
              dangerouslySetInnerHTML={{ __html: title}}
            />
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
            displacementMap={displacementMap}
            onClose={() => context.setActiveStep(null, title)}
            onClick={() => context.setActiveStep(i, step.title)}
            next={list[i]} // a bit weird, but we have an edge case for the title, which "is" the first element in the list
          />
        )
      }
    </SliderCmp>
  );
};
