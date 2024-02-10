import { useState } from 'react';
import { Button } from '../../../utils/custom/Button';
import FormLayout from '../../../utils/custom/FormLayout';
import InputBox from '../../../utils/custom/InputBox';
import SelectBox from '../../../utils/custom/SelectBox';
import TextArea from '../../../utils/custom/TextAreaBox';

import FileUpload from './FileUpload';

import HorizontalTab from '../../../utils/custom/HorizontalTab';

import { DocumentTextIcon } from '@heroicons/react/24/outline';
import { useDispatch, useSelector } from 'react-redux';
import { bindCategoryDropdown } from '../../../store/category';
import { bindBlog } from '../../../store/blog';
import BlogDescriptions from './BlogDescriptions';
const defaultTabs = [
  {
    id: 'description',
    title: 'Description',
    icon: <DocumentTextIcon className="me-2 h-4 w-4" aria-hidden="true" />,
    component: <BlogDescriptions />,
    isActive: true,
  },
];

const AddNewBlog = () => {
  const dispatch = useDispatch();
  const { categoryDropdown, isCategoryDropdownLoaded } = useSelector(
    ({ category }) => category
  );
  const { blog } = useSelector(({ blog }) => blog);
  const [blogDetails, setBlogDetails] = useState('');
  const [isOpenFileUploadModal, setIsOpenFileUploadModal] = useState(false);

  const { category } = blog;

  const handleDropdown = (data, e) => {
    const { name } = e;
    const updatedBlog = {
      ...blog,
      [name]: data,
    };

    dispatch(bindBlog(updatedBlog));
  };

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
          <div className="grid grid-cols-1 gap-6 ">
            <SelectBox
              id="categoryId"
              classNames=""
              isLoading={!isCategoryDropdownLoaded}
              isMulti={true}
              name="category"
              options={categoryDropdown}
              value={category}
              onChange={(data, e) => {
                handleDropdown(data, e);
              }}
              placeholder="Select Category"
              onFocus={() => {
                dispatch(bindCategoryDropdown());
              }}
            />
            {/* <SelectBox
              id="subCategoryId"
              classNames=""
              name="subCategory"
              options={[]}
              onChange={() => {}}
              placeholder="Select Sub Category"
            /> */}
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
