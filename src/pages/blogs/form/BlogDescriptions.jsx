import React, { useState } from 'react';
import RichEditor from '../../../utils/custom/Editor';

const BlogDescriptions = () => {
  const [blogDetails, setBlogDetails] = useState('');
  const handleTextEditorOnChange = (e) => {
    const { name, value } = e.target;
    setBlogDetails(value);
  };
  return (
    <RichEditor
      id="blog-details"
      name="details"
      value={blogDetails}
      onTextEditorChange={(e) => {
        handleTextEditorOnChange(e);
      }}
    />
  );
};

export default BlogDescriptions;
