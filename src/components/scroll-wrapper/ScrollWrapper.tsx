import React, { Children } from 'react';

import s from './ScrollWrapper.scss';

interface IRowProps {
  children: React.ReactNode;
}

export const ScrollWrapper = ({ children }: IRowProps) => (
  <div className={s.scrollWrapper}>
    <ol className={s.scrollWrapper__inner}>
      {Children.map(children, (child) => <li className={s.scrollWrapper__item}>{child}</li>)}
    </ol>
  </div>
);
