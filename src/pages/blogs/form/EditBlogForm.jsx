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
import { addCategory, bindCategoryDropdown } from "../../../store/category";
import { bindBlog, getBlog, updateBlog } from "../../../store/blog";
import { addTag, bindTagDropdown } from "../../../store/tag";
import { addKeyword, bindKeywordDropdown } from "../../../store/keyword";
import { getFilesByQuery } from "../../../store/file-upload";
import { uploadUrl } from "../../../services";
import { replaceImage } from "../../../utils/utility";
import SingleFileUpload from "../../../components/SingleFileUpload";
import { HttpStatusCode } from "axios";
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
    slug,
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
    videoLink,
    applyLink,
    pdfLink,
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
  const handleCategoryOnCreation = (inputValue) => {
    const obj = {
      name: inputValue,
      description: inputValue,
      isParent: true,
      isActive: true,
    };
    dispatch(addCategory(obj)).then((response) => {
      const { payload } = response;
      if (payload.status === HttpStatusCode.Created) {
        const value = {
          label: inputValue,
          value: payload.data.id,
        };

        const updated = {
          ...blog,
          ["category"]: [...category, value],
        };
        dispatch(bindBlog(updated));
      }
    });
  };

  const handleTagOnCreation = (inputValue) => {
    const obj = {
      name: inputValue,
      descriptions: inputValue,

      isActive: true,
    };
    dispatch(addTag(obj)).then((response) => {
      const { payload } = response;
      if (payload.status === HttpStatusCode.Created) {
        const value = {
          label: inputValue,
          value: payload.data.id,
        };

        const updated = {
          ...blog,
          ["tag"]: [...tag, value],
        };
        dispatch(bindBlog(updated));
      }
    });
  };

  const handleKeywordOnCreation = (inputValue) => {
    const obj = {
      name: inputValue,
      descriptions: inputValue,

      isActive: true,
    };
    dispatch(addKeyword(obj)).then((response) => {
      const { payload } = response;
      if (payload.status === HttpStatusCode.Created) {
        const value = {
          label: inputValue,
          value: payload.data.id,
        };

        const updated = {
          ...blog,
          ["keyword"]: [...keyword, value],
        };
        dispatch(bindBlog(updated));
      }
    });
  };

  const handleUploadModalOpen = () => {
    const queryParams = {
      page: 1,
      limit: 10,
      sort: "createdAt",
      orderBy: "desc",
      from: "blog",
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
      slug,

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
      videoLink,
      applyLink,
      pdfLink,
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
          label="Save"
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
      <div className="flex   gap-4">
        <div className="w-full ">
          <InputBox
            disabled={true}
            // label="Slug"
            classNames="mb-3 "
            name="slug"
            placeholder="slug"
            value={slug}
            onChange={(e) => {
              handleOnChange(e);
            }}
          />
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-9 gap-6">
        <div className="lg:col-span-7">
          <HorizontalTab defaultTabs={defaultTabs} />
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <InputBox
                label="Video Link"
                classNames="my-3"
                name="videoLink"
                placeholder="Video Link"
                value={videoLink}
                onChange={(e) => {
                  handleOnChange(e);
                }}
                onFocus={(e) => {
                  e.target.select();
                }}
              />
            </div>
            <div>
              <InputBox
                label="Apply Link"
                classNames="my-3"
                name="applyLink"
                placeholder="Apply Link"
                value={applyLink}
                onChange={(e) => {
                  handleOnChange(e);
                }}
              />
            </div>
            <div>
              <InputBox
                label="Pdf Link"
                classNames="my-3"
                name="pdfLink"
                placeholder="Pdf Link"
                value={pdfLink}
                onChange={(e) => {
                  handleOnChange(e);
                }}
              />
            </div>
          </div>
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
              isCreatable={true}
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
              onCreateOption={handleKeywordOnCreation}
            />
          </div>
        </div>
        <div className="lg:col-span-2 ">
          <div className="grid grid-cols-1 gap-6 ">
            <SelectBox
              isCreatable={true}
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
              onCreateOption={handleCategoryOnCreation}
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
              isCreatable={true}
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
              onCreateOption={handleTagOnCreation}
            />
            <div className="border rounded-md min-h-[200px]">
              <img
                id="uploaded-image"
                width={200}
                height={200}
                className="object-cover object-top w-[350px] h-[200px]  p-1   "
                src={featuredImageUrl ?? ""}
                onError={replaceImage}
                alt={featuredImageAltText}
              />
            </div>
            <Button
              id="upload-id"
              label="Feature Image"
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
