import { createContext } from 'react';
import type { Locale } from '.';

export type LocaleContextProps = Locale & { exist?: boolean };

export const LocaleContext = createContext<LocaleContextProps | undefined>(undefined);
