import type { AliasToken } from './alias';
import type { ComponentTokenMap } from './components';

/** Final token which contains the components level override */
export type GlobalToken = AliasToken & ComponentTokenMap;

export type { AliasToken } from './alias';
export type { ComponentTokenMap } from './components';
