import React from 'react';

type Props = {
  children?: React.ReactNode | React.ReactNode[];
};

export const ContentContainer = ({ children }: Props) => {
  return <div className="md:max-w-[450px] flex flex-col gap-4 m-auto px-4 mb-10">{children}</div>;
};
