import classnames from 'classnames';
import React from 'react';

export type AnchorProps = React.AnchorHTMLAttributes<HTMLAnchorElement>;

export function Anchor(props: AnchorProps) {
  const { className, children } = props;
  const classNames = classnames('anchor', className);
  return (
    <a {...props} className={classNames} target={'_blank'}>
      {children}
    </a>
  );
}
