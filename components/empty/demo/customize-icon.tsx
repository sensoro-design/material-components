import React from 'react';
import { Empty } from 'sensoro-design';
import NoDevicePurely from '@sensoro-design/icons/NoDevicePurely';

const App: React.FC = () => (
  <Empty
    icon={<NoDevicePurely />}
    description="暂无设备"
  />
);

export default App;
