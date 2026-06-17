import React from 'react';

export function Section({ children, className = '', ...props }) {
  return (
    <section className={`py-12 md:py-20 lg:py-28 ${className}`} {...props}>
      {children}
    </section>
  );
}
