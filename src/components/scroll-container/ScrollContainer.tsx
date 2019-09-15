import React from 'react';

import s from './ScrollContainer.scss';

export const ScrollContainer: React.FC = ({ children }) => (
  <div className={s.scrollContainer}>
    <div className={s.scrollContainer__inner}>{children}</div>
  </div>
);
