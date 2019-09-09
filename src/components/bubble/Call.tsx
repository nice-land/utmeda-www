import * as React from 'react';

import Decline from 'assets/svg/decline.svg';
import Accept from 'assets/svg/accept.svg';

import s from './Call.scss';

interface ICallProps {
  msg?: string;
}

export const Call = ({ msg }: ICallProps) => {
  if (!msg) {
    return null;
  }

  return (
    <div className={s.call}>
      <p className={s.call__name}>{msg}</p>

      <div className={s.call__buttons}>
        <Decline className={s.call__icon} />
        <Accept className={s.call__icon} />
      </div>
    </div>
  );
};
