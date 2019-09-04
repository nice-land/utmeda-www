import * as React from "react";
import { Canvas } from "components/canvas/Canvas";
import { injectIntl } from "gatsby-plugin-intl";
import { IStep } from "utils/interfaces";
import { navigate } from "gatsby";
import { StepsItem } from "./StepsItem";
import s from "./Steps.scss";
import { TextureLoader, Group } from "three";
import { useThree } from "react-three-fiber";
import { TweenLite, Power4 } from "gsap";
import { useKeyDown } from "hooks/use-keydown";
import { AppContext } from "components/app-layout/AppLayout";
import { debounce } from "lodash";

interface IProps {
  title: string;
  list: IStep[];
  intl: any;
}

interface IPosterProps {
  index: number;
  stepWatchText: string;
  poster: string;
  active: boolean;
  mouseEnter(props: any): void;
  mouseLeave(): void;
  mouseDown(): void;
}

const StepPoster = ({
  stepWatchText,
  index,
  poster,
  active,
  mouseEnter,
  mouseLeave,
  mouseDown
}: IPosterProps) => {
  const ref = React.useRef<Group>();
  const loader = new TextureLoader();
  const texture = React.useMemo(() => loader.load(poster), [poster]);

  const width = Math.min(window.innerWidth * 0.66667, 1000);
  const height = width / 1.77777;

  const handleMouseEnter = e => {
    mouseEnter({
      text: stepWatchText,
      icon: "play"
    });
  };

  const handleMouseLeave = () => {
    mouseLeave();
  };

  return (
    <group position-x={index * window.innerWidth} ref={ref}>
      <mesh
        position={[window.innerWidth * 0.15, 0, 0]}
        onPointerOver={handleMouseEnter}
        onPointerDown={mouseDown}
        onPointerOut={handleMouseLeave}
      >
        <planeGeometry attach="geometry" args={[width, height]} />
        <meshBasicMaterial attach="material">
          <primitive attach="map" object={texture} />
        </meshBasicMaterial>
      </mesh>
    </group>
  );
};

export const Controller = () => {
  const { camera, invalidate } = useThree();

  const handleScroll = () => {
    TweenLite.to(camera.position, 0.5, {
      x: window.scrollX,
      y: window.scrollY,
      onUpdate: invalidate,
      onComplete: invalidate
    });
  };

  React.useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return null;
};

export const Steps = injectIntl(({ intl, title, list }: IProps) => {
  const keys = useKeyDown();
  const [activeStep, set] = React.useState(0);
  const [shouldUpdate, setShouldUpdate] = React.useState(false);

  const { mouseEnter, mouseLeave } = React.useContext(AppContext);

  React.useEffect(() => {
    if (keys.includes(37)) {
      set(Math.max(0, activeStep - 1));
    } else if (keys.includes(39) || keys.includes(32)) {
      set(Math.min(list.length - 1, activeStep + 1));
    }
  }, [keys]);

  React.useEffect(() => {
    TweenLite.to(window, 1, {
      scrollTo: { x: activeStep * window.innerWidth },
      ease: Power4.easeInOut
    });
    setShouldUpdate(false);
  }, [activeStep, shouldUpdate]);

  const handleScroll = debounce(() => {
    set(Math.round(window.scrollX / window.innerWidth));
    setShouldUpdate(true);
  }, 500);

  React.useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  const handleMouseDown = (index: number) => {
    navigate(`/${index}`);
  };

  return (
    <div className={s.steps}>
      <div className={s.steps__canvas}>
        <Canvas orthographic={true}>
          <Controller />
          {list.map((step, i) => (
            <StepPoster
              stepWatchText={intl.formatMessage({ id: "step_watch" })}
              key={step.num}
              index={i}
              poster={step.poster}
              active={i === activeStep}
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
      <div className={s.steps__inner}>
        {list.map((step, i) => (
          <div key={i} className={s.steps__step}>
            <StepsItem
              key={i}
              index={i}
              text={step.title}
              count={(i + 1).toString().padStart(2, "0")}
              link={`/${i + 1}`}
              media={step.poster}
            />
          </div>
        ))}
      </div>
    </div>
  );
});
