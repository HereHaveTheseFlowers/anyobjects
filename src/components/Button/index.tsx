import classnames from 'classnames';
import React from 'react';

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

export function Button(props: ButtonProps) {
  const { className, children, onClick } = props;
  const classNames = classnames('button', className);
  return (
    <button {...props} className={classNames} onClick={onClick}>
      {children}
    </button>
  );
}
