import { render, } from '@testing-library/react';
import React, { StrictMode } from 'react';

import type { RenderOptions } from '@testing-library/react';

const customRender = (ui: React.ReactElement, options?: Omit<RenderOptions, 'wrapper'>) =>
  render(ui, { wrapper: StrictMode, ...options });


export { customRender as render, };
