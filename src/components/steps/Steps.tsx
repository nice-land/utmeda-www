import * as React from "react";
import { debounce } from "lodash";
import { IStep } from "utils/interfaces";
import Slider from "components/slider/Slider";

import { StepsItem } from "./StepsItem";

import s from "./Steps.scss";
import { AppContext } from "components/app-layout/AppLayout";

interface IProps {
  title: string;
  initialStep?: number;
  list: IStep[];
}

export const Steps = ({ title, list, initialStep }: IProps) => {
  const [width, setWidth] = React.useState(
    typeof window === "undefined" ? 720 : window.innerWidth * 0.7
  );

  const context = React.useContext(AppContext) as any;

  const handleResize = debounce(() => {
    setWidth(window.innerWidth * 0.7);
  }, 200);

  React.useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    if (initialStep) {
      setTimeout(() => context.setActiveStep(initialStep), 500);
    }

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
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
            count={i.toString().padStart(2, "0")}
            link={`/${i}`}
            media={step.poster}
            spring={x}
            video={step.video}
            active={a}
            onClose={() => context.setActiveStep(null)}
            onClick={() => context.setActiveStep(i)}
            next={list[i]} // a bit weird, but we have an edge case for the title, which "is" the first element in the list
          />
        )
      }
    </Slider>
  );
};
