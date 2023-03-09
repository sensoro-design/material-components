import React, { createContext, useContext, } from 'react';

export type DisabledType = boolean | undefined;

export const DisabledContext = createContext<DisabledType>(false);

export interface DisabledContextProps {
  disabled?: DisabledType;
  children?: React.ReactNode;
}

export const DisabledContextProvider: React.FC<DisabledContextProps> = ({ children, disabled }) => {
  const originDisabled = useContext(DisabledContext);
  return (
    <DisabledContext.Provider value={disabled ?? originDisabled}>
      {children}
    </DisabledContext.Provider>
  );
};
