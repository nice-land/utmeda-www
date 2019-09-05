import * as React from 'react';
import { Canvas } from 'components/canvas/Canvas';
import { injectIntl } from 'gatsby-plugin-intl';
import { IStep } from 'utils/interfaces';
import { TextureLoader, Group } from 'three';
import { useThree } from 'react-three-fiber';
import { navigate } from 'gatsby';
import { TweenLite, Power4 } from 'gsap';
import { useKeyDown } from 'hooks/use-keydown';
import { AppContext } from 'components/app-layout/AppLayout';
import { debounce } from 'lodash';

import { StepsItem } from './StepsItem';
import s from './Steps.scss';

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
  mouseDown,
}: IPosterProps) => {
  const ref = React.useRef<Group>();
  const loader = new TextureLoader();
  const texture = React.useMemo(() => loader.load(poster), [poster]);

  const width = Math.min(window.innerWidth * 0.66667, 1000);
  const height = width / 1.77777;

  const handleMouseEnter = (e) => {
    mouseEnter({
      text: stepWatchText,
      icon: 'play',
    });
  };

  const handleMouseLeave = () => {
    mouseLeave();
  };

  React.useEffect(() => {
    TweenLite.to(ref.current!.scale, 0.5, {
      x: active ? 1 : 0.8,
      y: active ? 1 : 0.8,
      ease: Power4.easeInOut,
    });
  }, [active]);

  return (
    <group position-x={index * window.innerWidth} ref={ref}>
      <mesh
        frustumCulled={false}
        scale={[0.8, 0.8, 0.8]}
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
      onComplete: invalidate,
    });
  };

  React.useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return null;
};

interface IState {
  active: number;
  animating: boolean;
}

export const Steps = injectIntl(({ intl, title, list }: IProps) => {
  const keys = useKeyDown([39, 37]);
  const [state, set] = React.useState<IState>({ active: 0, animating: false });

  const { mouseEnter, mouseLeave } = React.useContext(AppContext);

  React.useEffect(() => {
    if (keys.includes(37)) {
      set({ active: Math.max(0, state.active - 1), animating: true });
    } else if (keys.includes(39) || keys.includes(32)) {
      set({ active: Math.min(list.length - 1, state.active + 1), animating: true });
    }
  }, [keys]);

  React.useEffect(() => {
    TweenLite.to(window, 1, {
      scrollTo: { x: state.active * window.innerWidth },
      ease: Power4.easeInOut,
      onComplete: () => set((x) => ({ ...x, animating: false })),
    });
  }, [state]);

  const handleScroll = debounce(() => {
    if (!state.animating) {
      set((x) => ({ ...x, active: Math.round(window.scrollX / window.innerWidth) }));
    }
  }, 300);

  React.useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
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
      <div className={s.steps__inner}>
        {list.map((step, i) => (
          <div key={i} className={s.steps__step}>
            <StepsItem
              key={i}
              index={i}
              text={step.title}
              count={(i + 1).toString().padStart(2, '0')}
              link={`/${i + 1}`}
              media={step.poster}
            />
          </div>
        ))}
      </div>
    </div>
  );
});
