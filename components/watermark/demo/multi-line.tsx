import React from 'react';
import { Watermark } from 'sensoro-design';

const App: React.FC = () => (
  <Watermark content={['Sensoro Design', 'Happy Working']}>
    <div style={{ height: 500 }} />
  </Watermark>
);

export default App;
