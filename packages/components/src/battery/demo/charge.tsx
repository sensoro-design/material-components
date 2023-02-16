import React from 'react';
import { Space } from 'antd';
import { Battery } from '@lins-material/components';

export default () => {
  return (
    <Space>
      <Battery style={{ fontSize: 40 }} value={-1} />
      <Battery style={{ fontSize: 40 }} color="green" value={-1} />
    </Space>
  );
};
