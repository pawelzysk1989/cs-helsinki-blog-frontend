/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { ReactNode, useState } from 'react';

type Props = {
  title: string;
  children: ReactNode;
};

const Accordion = ({ title, children }: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen((isAccOpen) => !isAccOpen);
  };

  return (
    <div className="accordion">
      <div className="accordion__title" onClick={toggle}>
        <span>{title}</span>
      </div>
      <div className="accordion__content" aria-expanded={isOpen}>
        {children}
      </div>
    </div>
  );
};

export default Accordion;
