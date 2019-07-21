import React, { Children } from 'react';

import s from './ScrollWrapper.scss';

interface IRowProps {
  children: React.ReactNode;
  className?: string;
  snap?: boolean;
}

export const ScrollWrapper = ({ children, className, snap }: IRowProps) => (
  <div className={s(s.scrollWrapper, { snap })}>
    <ol className={s.scrollWrapper__inner}>
      {Children.map(children, (child) => <li className={s(s.scrollWrapper__item, className)}>{child}</li>)}
    </ol>
  </div>
);

ScrollWrapper.defaultProps = {
  snap: true,
};
