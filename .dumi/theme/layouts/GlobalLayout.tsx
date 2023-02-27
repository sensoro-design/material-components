import React from 'react';
import { ConfigProvider } from 'antd';
import { defaultToken } from '@lins-material/provider';

import { useOutlet } from 'dumi';

const GlobalLayout: React.FC = () => {
  const outlet = useOutlet();

  return (
    <ConfigProvider
      theme={{
        token: defaultToken,
      }}
    >
      {outlet}
    </ConfigProvider>
  )
}

export default GlobalLayout;
