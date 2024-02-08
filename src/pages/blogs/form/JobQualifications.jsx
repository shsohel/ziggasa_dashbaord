import React, { useState } from 'react';
import RichEditor from '../../../utils/custom/Editor';

const JobQualifications = () => {
  const [blogDetails, setBlogDetails] = useState('');
  const handleTextEditorOnChange = (e) => {
    const { name, value } = e.target;
    setBlogDetails(value);
  };
  return (
    <RichEditor
      id="job-qualifications"
      name="jobQualifications"
      value={blogDetails}
      onTextEditorChange={(e) => {
        handleTextEditorOnChange(e);
      }}
    />
  );
};

export default JobQualifications;
