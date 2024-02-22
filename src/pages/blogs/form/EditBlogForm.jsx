import { useEffect, useState } from "react";
import { Button } from "../../../utils/custom/Button";
import FormLayout from "../../../utils/custom/FormLayout";
import InputBox from "../../../utils/custom/InputBox";
import SelectBox from "../../../utils/custom/SelectBox";
import TextArea from "../../../utils/custom/TextAreaBox";

import BlogDescriptions from "./BlogDescriptions";
import HorizontalTab from "../../../utils/custom/HorizontalTab";

import { DocumentTextIcon } from "@heroicons/react/24/outline";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { bindCategoryDropdown } from "../../../store/category";
import { bindBlog, getBlog, updateBlog } from "../../../store/blog";
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
    component: <BlogDescriptions />,
    isActive: true,
  },
];

const EditBlogForm = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const dispatch = useDispatch();
  const { categoryDropdown, isCategoryDropdownLoaded } = useSelector(
    ({ category }) => category
  );
  const { tagDropdown, isTagDropdownLoaded } = useSelector(({ tag }) => tag);
  const { keywordDropdown, isKeywordDropdownLoaded } = useSelector(
    ({ keyword }) => keyword
  );
  const { blog } = useSelector(({ blog }) => blog);
  const [isOpenFileUploadModal, setIsOpenFileUploadModal] = useState(false);

  const {
    id,
    title,
    category,
    tag,
    details,

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
  } = blog;

  console.log(state);

  useEffect(() => {
    dispatch(getBlog({ id: state }));

    return () => {
      dispatch(bindBlog());
    };
  }, [dispatch, state]);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    const updated = {
      ...blog,
      [name]: value,
    };
    dispatch(bindBlog(updated));
  };

  const handleDropdown = (data, e) => {
    const { name } = e;
    const updatedBlog = {
      ...blog,
      [name]: data,
    };

    dispatch(bindBlog(updatedBlog));
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
      const updatedBlog = {
        ...blog,
        featuredImageUrl: fileUrl,
        featuredImageTitle: title,
        featuredImageCaptions: captions,
        featuredImageDescriptions: descriptions,
        featuredImageAltText: altText,
      };

      dispatch(bindBlog(updatedBlog));
      setIsOpenFileUploadModal((prev) => !prev);
    }
  };

  const onSubmit = () => {
    const obj = {
      id,
      title,
      category: category.map((cat) => cat.value),
      tag: tag.map((t) => t.value),
      keyword: keyword.map((t) => t.value),
      details,

      metaDescription,
      metaTitle,
      // author,
      featuredImageUrl,
      featuredImageTitle,
      featuredImageCaptions,
      featuredImageDescriptions,
      featuredImageAltText,
      isActive,
    };
    console.log("obj", JSON.stringify(obj, null, 2));

    dispatch(
      updateBlog({
        blog: obj,
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
    <FormLayout title="Edit Blog" actions={actions}>
      <InputBox
        label="Title"
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
              label="SEO Title"
              classNames="my-3"
              name="metaTitle"
              placeholder="SEO Title"
              value={metaTitle}
              onChange={(e) => {
                handleOnChange(e);
              }}
            />
            <TextArea
              label="SEO Descriptions"
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
              label="Keywords"
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
              label="Category"
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
              label="Tag"
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

export default EditBlogForm;
