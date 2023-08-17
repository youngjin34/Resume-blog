import React from 'react';

import PostEditor from '../components/PostEditor';

const New = ({ boardId }) => {

  return (
    <div>
      <PostEditor
        isEdit={false}
        originData={null}
        boardId={boardId}
      />
    </div>
  );
};

export default New;
