import React from 'react';
import { TagList } from '@lins-material/components';

export default () => {
  return (
    <>
      <TagList
        max={4}
        list={[
          { text: '北京' },
          { text: '大华' },
          { text: '升哲' },
          { text: '大华' },
          { text: 'tag5' },
          { text: 'tag6' },
          { text: 'tag7' },
          { text: 'tag8' }
        ]}
      />
    </>
  );
}
