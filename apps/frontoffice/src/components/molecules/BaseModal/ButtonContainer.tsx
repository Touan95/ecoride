import React from 'react';

type Props = {
  children?: React.ReactNode | React.ReactNode[];
};

export const ButtonContainer = ({ children }: Props) => {
  return <div className="flex gap-[15px] justify-center p-5 mt-[50px] rounded-[20px] bg-gray-100">{children}</div>;
};
