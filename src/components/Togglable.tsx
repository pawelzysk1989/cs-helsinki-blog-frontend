import React, { forwardRef, ReactNode, Ref, useImperativeHandle, useState } from 'react';

type Props = {
  buttonLabel: string;
  title: string;
  children: ReactNode;
};

export type TogglableRef = {
  toggle: () => void;
};

const Togglable = ({ buttonLabel, title, children }: Props, ref: Ref<TogglableRef>) => {
  const [isVisible, setIsVisible] = useState(false);

  const toggle = () => {
    setIsVisible((visible) => !visible);
  };
  useImperativeHandle(ref, () => ({
    toggle,
  }));

  return (
    <div className="togglable">
      <div className="togglable__title">
        {isVisible ? <h2>{title}</h2> : <button onClick={toggle}>{buttonLabel}</button>}
      </div>
      <div className="togglable__body" aria-expanded={!isVisible}>
        {children}
        <button onClick={toggle}>cancel</button>
      </div>
    </div>
  );
};

export default forwardRef(Togglable);
