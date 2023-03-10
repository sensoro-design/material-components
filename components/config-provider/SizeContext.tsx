import React, { useContext, createContext, } from 'react';

export type SizeType = 'small' | 'middle' | 'large' | undefined;

export const SizeContext = createContext<SizeType>(undefined);

export interface SizeContextProps {
  size?: SizeType;
  children?: React.ReactNode;
}

export const SizeContextProvider: React.FC<SizeContextProps> = ({ children, size }) => {
  const originSize = useContext<SizeType>(SizeContext);
  return <SizeContext.Provider value={size || originSize}>{children}</SizeContext.Provider>;
};
