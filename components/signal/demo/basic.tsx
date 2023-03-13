import React from 'react';
import { Signal, Space } from 'sensoro-design';

const App: React.FC = () => (
  <Space>
    <Signal style={{ fontSize: 40 }} value={0} />
    <Signal style={{ fontSize: 40 }} value={1} />
    <Signal style={{ fontSize: 40 }} value={2} />
    <Signal style={{ fontSize: 40 }} value={3} />
    <Signal style={{ fontSize: 40 }} value={4} />
    <Signal style={{ fontSize: 40 }} value={5} />
  </Space>
)

export default App;
