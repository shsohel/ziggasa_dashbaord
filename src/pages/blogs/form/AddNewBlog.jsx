import { useState } from 'react';
import { Button } from '../../../utils/custom/Button';
import RichEditor from '../../../utils/custom/Editor';
import FormLayout from '../../../utils/custom/FormLayout';
import InputBox from '../../../utils/custom/InputBox';
import SelectBox from '../../../utils/custom/SelectBox';
import TextArea from '../../../utils/custom/TextAreaBox';

import FileUpload from './FileUpload';

import BlogDescriptions from './BlogDescriptions';
import HorizontalTab from '../../../utils/custom/HorizontalTab';
import JobQualifications from './JobQualifications';
import JobResponsibilities from './JobResponsibilities';
import {
  DocumentTextIcon,
  DocumentChartBarIcon,
  DocumentCheckIcon,
} from '@heroicons/react/24/outline';
const defaultTabs = [
  {
    id: 'description',
    title: 'Description',
    icon: <DocumentTextIcon className="me-2 h-4 w-4" aria-hidden="true" />,
    component: <BlogDescriptions />,
    isActive: true,
  },
  {
    id: 'qualifications',
    title: 'Qualifications',
    icon: <DocumentCheckIcon className="me-2 h-4 w-4" aria-hidden="true" />,
    component: <JobQualifications />,
    isActive: false,
  },
  {
    id: 'responsibilities',
    title: 'Responsibilities',
    icon: <DocumentChartBarIcon className="me-2 h-4 w-4" aria-hidden="true" />,
    component: <JobResponsibilities />,
    isActive: false,
  },
];

const AddNewBlog = () => {
  const [blogDetails, setBlogDetails] = useState('');
  const [isOpenFileUploadModal, setIsOpenFileUploadModal] = useState(false);

  const handleTextEditorOnChange = (e) => {
    const { name, value } = e.target;
    setBlogDetails(value);
  };
  const handleUploadModalOpen = () => {
    setIsOpenFileUploadModal((prev) => !prev);
  };
  const handleFileUploadSubmit = () => {};
  const actions = [
    {
      id: '1',
      name: 'new-button',
      button: <Button id="save-button" name="Save" onClick={() => {}} />,
    },
  ];

  return (
    <FormLayout title="New Blog" actions={actions}>
      <InputBox
        classNames="mb-3"
        name="title"
        placeholder="Title"
        onChange={() => {}}
      />
      <div className="grid grid-cols-1 lg:grid-cols-9 gap-6">
        <div className="lg:col-span-6">
          <HorizontalTab defaultTabs={defaultTabs} />
        </div>
        <div className="lg:col-span-3 ">
          <div className="grid grid-cols-1 gap-6">
            <SelectBox
              id="categoryId"
              classNames=""
              name="category"
              options={[]}
              onChange={() => {}}
              placeholder="Select Category"
            />
            <SelectBox
              id="subCategoryId"
              classNames=""
              name="subCategory"
              options={[]}
              onChange={() => {}}
              placeholder="Select Sub Category"
            />
            <SelectBox
              id="tagId"
              classNames=""
              isMulti={true}
              name="tag"
              options={[{}]}
              onChange={() => {}}
              placeholder="Select Tag"
            />
            <div className="border rounded-md min-h-[200px]"></div>
            <Button
              id="upload-id"
              name="Upload"
              onClick={() => {
                handleUploadModalOpen();
              }}
            />
          </div>
        </div>
      </div>

      <InputBox
        classNames="my-3"
        name="metaTitle"
        placeholder="SEO Title"
        onChange={() => {}}
      />
      <TextArea
        classNames="my-3 "
        name="metaDescription"
        placeholder="SEO Descriptions"
        onChange={() => {}}
      />
      <SelectBox
        id="keywordId"
        classNames=""
        isMulti={true}
        name="keyword"
        options={[{}]}
        onChange={() => {}}
        placeholder="Select Keyword"
      />
      <FileUpload
        isOpen={isOpenFileUploadModal}
        onClose={handleUploadModalOpen}
        onSubmit={handleFileUploadSubmit}
      />
    </FormLayout>
  );
};

export default AddNewBlog;
