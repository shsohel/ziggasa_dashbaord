import { useState } from "react";
import { Button } from "../../../utils/custom/Button";
import RichEditor from "../../../utils/custom/Editor";
import FormLayout from "../../../utils/custom/FormLayout";
import InputBox from "../../../utils/custom/InputBox";
import SelectBox from "../../../utils/custom/SelectBox";
import TextArea from "../../../utils/custom/TextAreaBox";


import JobDescriptions from "./JobDescriptions";
import HorizontalTab from "../../../utils/custom/HorizontalTab";
import JobQualifications from "./JobQualifications";
import JobResponsibilities from "./JobResponsibilities";
import {
  DocumentTextIcon,
  DocumentChartBarIcon,
  DocumentCheckIcon,
} from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { bindCategoryDropdown } from "../../../store/category";
import { addNewJob, bindJob } from "../../../store/job";
import { bindTagDropdown } from "../../../store/tag";
import { bindKeywordDropdown } from "../../../store/keyword";
import { getFilesByQuery } from "../../../store/file-upload";
import { uploadUrl } from "../../../services";
import { replaceImage } from "../../../utils/utility";
import SingleFileUpload from "../../../components/SingleFileUpload";
const defaultTabs = [
  {
    id: "description",
    title: "Description",
    icon: <DocumentTextIcon className="me-2 h-4 w-4" aria-hidden="true" />,
    component: <JobDescriptions />,
    isActive: true,
  },
  {
    id: "qualifications",
    title: "Qualifications",
    icon: <DocumentCheckIcon className="me-2 h-4 w-4" aria-hidden="true" />,
    component: <JobQualifications />,
    isActive: false,
  },
  {
    id: "responsibilities",
    title: "Responsibilities",
    icon: <DocumentChartBarIcon className="me-2 h-4 w-4" aria-hidden="true" />,
    component: <JobResponsibilities />,
    isActive: false,
  },
];

const AddNewJob = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { categoryDropdown, isCategoryDropdownLoaded } = useSelector(
    ({ category }) => category
  );
  const { tagDropdown, isTagDropdownLoaded } = useSelector(({ tag }) => tag);
  const { keywordDropdown, isKeywordDropdownLoaded } = useSelector(
    ({ keyword }) => keyword
  );
  const { job } = useSelector(({ job }) => job);
  const [jobDetails, setJobDetails] = useState("");
  const [isOpenFileUploadModal, setIsOpenFileUploadModal] = useState(false);

  const {
    title,
    category,
    tag,
    details,
    qualifications,
    responsibilities,
    keyword,
    metaDescription,
    metaTitle,
    author,
    featuredImageUrl,
    featuredImageTitle,
    featuredImageCaptions,
    featuredImageDescriptions,
    featuredImageAltText,
    isActive,
  } = job;

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    const updated = {
      ...job,
      [name]: value,
    };
    dispatch(bindJob(updated));
  };

  const handleDropdown = (data, e) => {
    const { name } = e;
    const updatedJob = {
      ...job,
      [name]: data,
    };

    dispatch(bindJob(updatedJob));
  };

  const handleUploadModalOpen = () => {
    const queryParams = {
      page: 1,
      limit: 10,
      sort: "createdAt",
      orderBy: "desc",
    };
    dispatch(getFilesByQuery({ queryParams }));
    setIsOpenFileUploadModal((prev) => !prev);
  };
  const handleModalClose = () => {
    setIsOpenFileUploadModal((prev) => !prev);
  };
  const handleFileUploadSubmit = (file) => {
    if (file) {
      const { title, descriptions, altText, fileUrl, captions } = file;
      const updatedJob = {
        ...job,
        featuredImageUrl: fileUrl,
        featuredImageTitle: title,
        featuredImageCaptions: captions,
        featuredImageDescriptions: descriptions,
        featuredImageAltText: altText,
      };

      dispatch(bindJob(updatedJob));
      setIsOpenFileUploadModal((prev) => !prev);
    }
  };

  const onSubmit = () => {
    const obj = {
      title,
      category: category.map((cat) => cat.value),
      tag: tag.map((t) => t.value),
      keyword: keyword.map((t) => t.value),
      details,
      qualifications,
      responsibilities,
      metaDescription,
      metaTitle,
      // author,
      featuredImageUrl,
      featuredImageTitle,
      featuredImageCaptions,
      featuredImageDescriptions,
      featuredImageAltText,
      isActive,
      jobType: "Full-Time",
    };
    console.log("obj", JSON.stringify(obj, null, 2));

    dispatch(
      addNewJob({
        job: obj,
        navigate,
      })
    );
  };

  const actions = [
    {
      id: "1",
      name: "new-button",
      button: (
        <Button
          id="save-button"
          name="Save"
          onClick={() => {
            onSubmit();
          }}
        />
      ),
    },
  ];

  return (
    <FormLayout title="New Job" actions={actions}>
      <InputBox
        classNames="mb-3"
        name="title"
        placeholder="Title"
        value={title}
        onChange={(e) => {
          handleOnChange(e);
        }}
      />
      <div className="grid grid-cols-1 lg:grid-cols-9 gap-6">
        <div className="lg:col-span-7">
          <HorizontalTab defaultTabs={defaultTabs} />
          <div>
            <InputBox
              classNames="my-3"
              name="metaTitle"
              placeholder="SEO Title"
              value={metaTitle}
              onChange={(e) => {
                handleOnChange(e);
              }}
            />
            <TextArea
              classNames="my-3 "
              name="metaDescription"
              placeholder="SEO Descriptions"
              value={metaDescription}
              onChange={(e) => {
                handleOnChange(e);
              }}
            />
            <SelectBox
              id="keywordId"
              classNames=""
              isMulti={true}
              name="keyword"
              isLoading={!isKeywordDropdownLoaded}
              options={keywordDropdown}
              value={keyword}
              onChange={(data, e) => {
                handleDropdown(data, e);
              }}
              placeholder="Select Keyword"
              onFocus={() => {
                dispatch(bindKeywordDropdown());
              }}
            />
          </div>
        </div>
        <div className="lg:col-span-2 ">
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
              isLoading={!isTagDropdownLoaded}
              isMulti={true}
              name="tag"
              options={tagDropdown}
              value={tag}
              onChange={(data, e) => {
                handleDropdown(data, e);
              }}
              placeholder="Select Tag"
              onFocus={() => {
                dispatch(bindTagDropdown());
              }}
            />
            <div className="border rounded-md min-h-[200px]">
              <img
                id="uploaded-image"
                width={200}
                height={200}
                className="object-cover object-top w-[350px] h-[200px]  p-1   "
                src={`${uploadUrl}/${featuredImageUrl ?? ""}`}
                onError={replaceImage}
                alt={featuredImageAltText}
              />
            </div>
            <Button
              id="upload-id"
              name="Feature Image"
              onClick={() => {
                handleUploadModalOpen();
              }}
            />
          </div>
        </div>
      </div>

      {isOpenFileUploadModal && (
        <SingleFileUpload
          isOpen={isOpenFileUploadModal}
          onClose={handleModalClose}
          onSubmit={handleFileUploadSubmit}
        />
      )}
    </FormLayout>
  );
};

export default AddNewJob;
