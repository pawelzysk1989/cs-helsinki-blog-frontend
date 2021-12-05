import React from 'react';

type Props = {
  title?: string;
  children: React.ReactNode;
};

const Section = ({ title, children }: Props) => {
  return (
    <section className="section">
      {title && <h2 className="section__header">{title}</h2>}
      <div className="section_body">{children}</div>
    </section>
  );
};

export default Section;
