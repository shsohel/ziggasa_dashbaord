import React, { useState } from 'react';
import RichEditor from '../../../utils/custom/Editor';
import { useDispatch, useSelector } from 'react-redux';
import { bindJob } from '../../../store/job';

const JobDescriptions = () => {
  const dispatch = useDispatch();
  const [jobDetails, setJobDetails] = useState('');
  const { job } = useSelector(({ job }) => job);
  const { details } = job;

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
      id="job-details-d"
      name="details"
      value={details}
      onTextEditorChange={(e) => {
        handleTextEditorOnChange(e);
      }}
    />
  );
};

export default JobDescriptions;
