import * as React from 'react';

import s from './Circle.scss';

interface ICircleProps {
  text: undefined | string | string[];
}

export const Circle = ({ text }: ICircleProps) => {
  const length = String(text).length > 10 ? 2 : 3;
  const items = Array.isArray(text) ? text : Array.from({ length }).map(() => text);

  return (
    <svg
      className={s.circle}
      viewBox="0 0 500 500"
    >
      <defs>
        <path
          d="M50,250c0-110.5,89.5-200,200-200s200,89.5,200,200s-89.5,200-200,200S50,360.5,50,250"
          id="textcircle"
        />
      </defs>

      {items.map((item, index) => (
        <text
          key={index}
          transform={`rotate(${(index / items.length) * 360} 250 250)`}
        >
          <textPath
            xlinkHref="#textcircle"
            // startOffset={...} // @todo figure out offset from text length
          >
            {item}
          </textPath>
        </text>
      ))}
    </svg>
  );
};
