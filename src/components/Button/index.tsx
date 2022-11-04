import classnames from 'classnames';
import React from 'react';

import './styles.sass';

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

export function Button(props: ButtonProps) {
  const { className, children } = props;
  const classNames = classnames('button', className);
  return (
    <button {...props} className={classNames}>
      {children}
    </button>
  );
}
