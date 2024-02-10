import React, { useState } from 'react';
import RichEditor from '../../../utils/custom/Editor';
import { useDispatch, useSelector } from 'react-redux';
import { bindJob } from '../../../store/job';

const JobResponsibilities = () => {
  const dispatch = useDispatch();
  const { job } = useSelector(({ job }) => job);
  const { responsibilities } = job;

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
      id="job-responsibilities"
      name="responsibilities"
      value={responsibilities}
      onTextEditorChange={(e) => {
        handleTextEditorOnChange(e);
      }}
    />
  );
};

export default JobResponsibilities;
