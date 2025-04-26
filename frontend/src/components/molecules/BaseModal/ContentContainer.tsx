import React from 'react';

type Props = {
  children?: React.ReactNode | React.ReactNode[];
};

export const ContentContainer = ({ children }: Props) => {
  return <div className="flex flex-col gap-4 px-4 mb-10 self-center">{children}</div>;
};
