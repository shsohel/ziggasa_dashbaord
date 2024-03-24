import { useState } from "react";
import { Button } from "../../../utils/custom/Button";
import RichEditor from "../../../utils/custom/Editor";
import FormLayout from "../../../utils/custom/FormLayout";
import InputBox from "../../../utils/custom/InputBox";
import SelectBox from "../../../utils/custom/SelectBox";
import TextArea from "../../../utils/custom/TextAreaBox";

import BlogDescriptions from "./BlogDescriptions";
import HorizontalTab from "../../../utils/custom/HorizontalTab";

import {
  DocumentTextIcon,
  DocumentChartBarIcon,
  DocumentCheckIcon,
} from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { bindCategoryDropdown } from "../../../store/category";
import { addNewBlog, bindBlog } from "../../../store/blog";
import { bindTagDropdown } from "../../../store/tag";
import { bindKeywordDropdown } from "../../../store/keyword";
import { getFilesByQuery } from "../../../store/file-upload";
import { uploadUrl } from "../../../services";
import { replaceImage } from "../../../utils/utility";
import SingleFileUpload from "../../../components/SingleFileUpload";
import { slugCheck, slugGeneration } from "../../../store/common";
const defaultTabs = [
  {
    id: "description",
    title: "Description",
    icon: <DocumentTextIcon className="me-2 h-4 w-4" aria-hidden="true" />,
    component: <BlogDescriptions />,
    isActive: true,
  },
];

const AddNewBlog = () => {
  const navigate = useNavigate();
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
  const { loading: commonLoading } = useSelector(({ common }) => common);

  const {
    title,
    slug,
    category,
    tag,
    details,
    keyword,
    metaDescription,
    metaTitle,
    featuredImageUrl,
    featuredImageTitle,
    featuredImageCaptions,
    featuredImageDescriptions,
    featuredImageAltText,
    isActive,
  } = blog;

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    const updated = {
      ...blog,
      [name]: value,
    };
    dispatch(bindBlog(updated));
  };

  const handleSlugGeneration = (title) => {
    const obj = {
      title: title,
      model: "Blog",
    };
    dispatch(slugGeneration(obj))
      .then((response) => {
        const { status, data, statusText } = response.payload;
        const slug = data?.data;
        const updated = {
          ...blog,
          ["slug"]: slug,
        };
        dispatch(bindBlog(updated));
      })
      .catch((error) => {
        const { response } = error;
      });
  };
  const handleSlugCheck = (slug) => {
    const obj = {
      slug,
      model: "Blog",
    };
    dispatch(slugCheck(obj))
      .then((response) => {
        const { status, data, statusText } = response.payload;
        console.log(data);
        const slug = data?.data;
        if (slug) {
          const updated = {
            ...blog,
            ["slug"]: slug,
          };
          dispatch(bindBlog(updated));
        }
      })
      .catch((error) => {
        const { response } = error;
      });
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
      from: "blog",
    };
    dispatch(getFilesByQuery({ queryParams }));
    setIsOpenFileUploadModal((prev) => !prev);
  };
  const handleModalClose = () => {
    setIsOpenFileUploadModal((prev) => !prev);
  };
  const handleFileUploadSubmit = (file) => {
    console.log("file", JSON.stringify(file, null, 2));
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

      console.log("updatedBlog", JSON.stringify(updatedBlog, null, 2));

      dispatch(bindBlog(updatedBlog));
      setIsOpenFileUploadModal((prev) => !prev);
    }
  };

  const onSubmit = () => {
    const obj = {
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
      isActive,
    };
    console.log("obj", JSON.stringify(obj, null, 2));

    dispatch(
      addNewBlog({
        blog: obj,
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
          label="Save"
          onClick={() => {
            onSubmit();
          }}
        />
      ),
    },
  ];

  return (
    <FormLayout title="Add Blog" actions={actions}>
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

        <div className="">
          <Button
            id="url Sche"
            label="Check Url"
            onClick={() => {
              handleSlugCheck(slug);
            }}
          />
        </div>
        <div className="">
          <Button
            id="editslug"
            label="Re-Generate"
            onClick={() => {
              handleSlugGeneration(title);
            }}
          />
        </div>
      </div>
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

export default AddNewBlog;
