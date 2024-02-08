import React, { useState } from 'react';
import RichEditor from '../../../utils/custom/Editor';

const JobResponsibilities = () => {
  const [blogDetails, setBlogDetails] = useState('');
  const handleTextEditorOnChange = (e) => {
    const { name, value } = e.target;
    setBlogDetails(value);
  };
  return (
    <RichEditor
      id="job-responsibilities"
      name="jobResponsibilities"
      value={blogDetails}
      onTextEditorChange={(e) => {
        handleTextEditorOnChange(e);
      }}
    />
  );
};

export default JobResponsibilities;
