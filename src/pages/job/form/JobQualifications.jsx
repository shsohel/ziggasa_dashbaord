import React, { useState } from 'react';
import RichEditor from '../../../utils/custom/Editor';
import { useDispatch, useSelector } from 'react-redux';
import { bindJob } from '../../../store/job';

const JobQualifications = () => {
  const dispatch = useDispatch();
  const { job } = useSelector(({ job }) => job);
  const { qualifications } = job;

  const handleTextEditorOnChange = (e) => {
    const { name, value } = e.target;
    const updated = {
      ...job,
      [name]: value,
    };
    dispatch(bindJob(updated));
  };
  return (
    <RichEditor
      id="job-qualifications"
      name="qualifications"
      value={qualifications}
      onTextEditorChange={(e) => {
        handleTextEditorOnChange(e);
      }}
    />
  );
};

export default JobQualifications;
