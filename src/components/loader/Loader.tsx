import React, { useState, useEffect } from 'react';
import { useSpring, animated } from 'react-spring';

import { useSlideWidth } from 'hooks/use-slide-width';

import s from './Loader.scss';

interface IResource {
  type: 'image' | 'video';
  src: string;
}

interface IProps {
  resources: IResource[];
  title: string;
  children: () => any;
}

export const Loader =
  typeof window === 'undefined'
    ? () => null
    : ({ resources, children, title }: IProps) => {
        const [loaded, set] = useState(0);
        const [loadComplete, setLoadComplete] = useState(false);
        const width = useSlideWidth();

        const handleRest = () => {
          if (loaded === resources.length) {
            setLoadComplete(true);
          }
        };

        const styles = useSpring({ loaded, backgroundClip: 'text', onRest: handleRest });

        useEffect(() => {
          resources.forEach(({ src }) => {
            const img = new Image();
            img.addEventListener('load', () => set((lo) => lo + 1));
            img.src = src;
          });
        }, []);

        if (loadComplete) {
          return children();
        }

        return (
          <div className={s.loader}>
            <div
              className={s.loader__background}
              style={{
                width: `${width}px`,
              }}
            >
              <animated.h1
                className={s.loader__text}
                style={{
                  backgroundImage: styles.loaded
                    .interpolate({ range: [0, resources.length], output: [0, 100] })
                    .interpolate(
                      (val) => `linear-gradient(to right, #fff ${val}%, #303030 ${val}%, #303030 100%)`,
                    ),
                }}
              >
                {title}
              </animated.h1>
            </div>
          </div>
        );
      };
