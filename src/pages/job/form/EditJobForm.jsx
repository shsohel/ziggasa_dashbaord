import { useEffect, useState } from "react";
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
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addCategory, bindCategoryDropdown } from "../../../store/category";
import { addNewJob, bindJob, getJob, updateJob } from "../../../store/job";
import { addTag, bindTagDropdown } from "../../../store/tag";
import { addKeyword, bindKeywordDropdown } from "../../../store/keyword";
import { getFilesByQuery } from "../../../store/file-upload";
import { uploadUrl } from "../../../services";
import { replaceImage } from "../../../utils/utility";
import SingleFileUpload from "../../../components/SingleFileUpload";
import {
  benefitsOptions,
  currenciesOptions,
  jobTypes,
} from "../../../store/job/model";
import { bindCompanyDropdown } from "../../../store/company";
import { addSkill, bindSkillDropdown } from "../../../store/skill";
import { countriesOption } from "../../../utils/enum";
import { HttpStatusCode } from "axios";
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

const EditJobForm = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const dispatch = useDispatch();
  const { categoryDropdown, isCategoryDropdownLoaded } = useSelector(
    ({ category }) => category
  );
  const { companyDropdown, isCompanyDropdownLoaded } = useSelector(
    ({ company }) => company
  );
  const { tagDropdown, isTagDropdownLoaded } = useSelector(({ tag }) => tag);
  const { keywordDropdown, isKeywordDropdownLoaded } = useSelector(
    ({ keyword }) => keyword
  );
  const { skillDropdown, isSkillDropdownLoaded } = useSelector(
    ({ skill }) => skill
  );
  const { job } = useSelector(({ job }) => job);
  const [jobDetails, setJobDetails] = useState("");
  const [isOpenFileUploadModal, setIsOpenFileUploadModal] = useState(false);

  const {
    id,
    title,
    slug,
    category,
    company,
    currency,
    jobType,
    tag,
    details,
    qualifications,
    responsibilities,
    keyword,
    metaDescription,
    metaTitle,
    author,
    jobExperience,
    skills,
    benefits,
    salary,
    phoneNumber,
    email,
    featuredImageUrl,
    featuredImageTitle,
    featuredImageCaptions,
    featuredImageDescriptions,
    featuredImageAltText,
    deadline,
    applyLink,
    pdfLink,
    jobCountry,
    jobState,
    isActive,
  } = job;

  console.log(state);

  useEffect(() => {
    dispatch(getJob({ id: state }));

    return () => {
      dispatch(bindJob());
    };
  }, [dispatch, state]);

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
    let updatedJob;
    if (name === "jobCountry") {
      updatedJob = {
        ...job,
        [name]: data,
        ["jobState"]: null,
      };
    } else {
      updatedJob = {
        ...job,
        [name]: data,
      };
    }

    dispatch(bindJob(updatedJob));
  };

  const handleUploadModalOpen = () => {
    const queryParams = {
      page: 1,
      limit: 10,
      sort: "createdAt",
      orderBy: "desc",
      from: "job",
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
    const jobLocation = {
      country: jobCountry?.label ?? "",
      state: jobState?.label ?? "",
    };
    const obj = {
      id,
      title,
      slug,
      category: category.map((cat) => cat.value),
      tag: tag.map((t) => t.value),
      keyword: keyword.map((t) => t.value),
      details,
      qualifications,
      responsibilities,
      metaDescription,
      metaTitle,
      company: company?.value ?? "",
      skill: skills.map((t) => t.value),
      benefits: benefits.map((t) => t.value),
      salary,
      currency: currency?.label ?? "",
      jobExperience,
      phoneNumber,
      email,
      featuredImageUrl,
      featuredImageTitle,
      featuredImageCaptions,
      featuredImageDescriptions,
      featuredImageAltText,
      deadline,
      applyLink,
      pdfLink,
      jobLocation: JSON.stringify(jobLocation),
      isActive,
      jobType: jobType?.value ?? "",
    };
    console.log("obj", JSON.stringify(obj, null, 2));

    dispatch(
      updateJob({
        job: obj,
      })
    );
  };

  const handleSkillOnCreation = (inputValue) => {
    const obj = {
      name: inputValue,
      descriptions: inputValue,

      isActive: true,
    };
    dispatch(addSkill(obj)).then((response) => {
      const { payload } = response;
      if (payload.status === HttpStatusCode.Created) {
        console.log(response);
        const value = {
          label: inputValue,
          value: payload.data.id,
        };
        console.log([...job.skill, value]);
        const updated = {
          ...job,
          ["skills"]: [...job.skills, value],
        };
        dispatch(bindJob(updated));
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
          ...job,
          ["tag"]: [...tag, value],
        };
        dispatch(bindJob(updated));
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
          ...job,
          ["keyword"]: [...keyword, value],
        };
        dispatch(bindJob(updated));
      }
    });
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
          ...job,
          ["category"]: [...category, value],
        };
        dispatch(bindJob(updated));
      }
    });
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

  const states =
    countriesOption.find((c) => c.value === jobCountry?.value)?.states ?? [];

  return (
    <FormLayout title="Edit Job" actions={actions}>
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
      <div className="grid grid-cols-1 lg:grid-cols-9 gap-6">
        <div className="lg:col-span-7">
          <HorizontalTab defaultTabs={defaultTabs} />

          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <InputBox
                label="Experiences"
                classNames="my-3 "
                name="jobExperience"
                placeholder="Job Experiences"
                value={jobExperience}
                onChange={(e) => {
                  handleOnChange(e);
                }}
              />
            </div>
            <div>
              <InputBox
                label="Salary"
                classNames="my-3 "
                name="salary"
                placeholder="Salary"
                value={salary}
                onChange={(e) => {
                  handleOnChange(e);
                }}
              />
            </div>
            <div>
              <SelectBox
                id="currencyId"
                label="Currency"
                classNames="my-3"
                name="currency"
                options={currenciesOptions}
                value={currency}
                onChange={(data, e) => {
                  handleDropdown(data, e);
                }}
                placeholder="Salary Currency"
              />
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <InputBox
                label="Contact Number"
                classNames="my-3"
                type="tel"
                name="phoneNumber"
                placeholder="Contact Number"
                value={phoneNumber}
                onChange={(e) => {
                  handleOnChange(e);
                }}
              />
            </div>
            <div>
              <InputBox
                label="Email"
                classNames="my-3"
                name="email"
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => {
                  handleOnChange(e);
                }}
              />
            </div>
            <div>
              <InputBox
                label="Deadline"
                classNames="my-3"
                name="deadline"
                // type="date"
                type="datetime-local"
                pattern=""
                placeholder="Deadline"
                value={deadline}
                onChange={(e) => {
                  handleOnChange(e);
                }}
              />
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
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
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <SelectBox
                id="jobCountryId"
                label="Job Country"
                classNames=""
                name="jobCountry"
                options={countriesOption}
                value={jobCountry}
                onChange={(data, e) => {
                  handleDropdown(data, e);
                }}
                placeholder="Select Country"
              />
            </div>
            <div>
              <SelectBox
                isCreatable={true}
                id="jobStateId"
                label="Job State"
                classNames=""
                name="jobState"
                options={states}
                value={jobState}
                onChange={(data, e) => {
                  handleDropdown(data, e);
                }}
                placeholder="Select State"
              />
            </div>
          </div>
          <div>
            <SelectBox
              isCreatable={true}
              id="skillsId"
              label="Skills"
              classNames=""
              isMulti={true}
              name="skills"
              isLoading={!isSkillDropdownLoaded}
              options={skillDropdown}
              value={skills}
              onChange={(data, e) => {
                handleDropdown(data, e);
              }}
              placeholder="Select Skill"
              onFocus={() => {
                dispatch(bindSkillDropdown());
              }}
              onCreateOption={handleSkillOnCreation}
            />
            <SelectBox
              isCreatable={true}
              id="benefitId"
              label="Benefits"
              classNames=""
              isMulti={true}
              name="benefits"
              options={benefitsOptions}
              value={benefits}
              onChange={(data, e) => {
                handleDropdown(data, e);
              }}
              placeholder="Select Benefits"
            />
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
              id="organizationId"
              label="Organization"
              classNames=""
              isLoading={!isCompanyDropdownLoaded}
              name="company"
              options={companyDropdown}
              value={company}
              onChange={(data, e) => {
                handleDropdown(data, e);
              }}
              placeholder="Select Organization"
              onFocus={() => {
                dispatch(bindCompanyDropdown());
              }}
            />
            <SelectBox
              id="jobTypeId"
              label="Job Type"
              classNames=""
              name="jobType"
              options={jobTypes}
              value={jobType}
              onChange={(data, e) => {
                handleDropdown(data, e);
              }}
              placeholder="Select Job Type"
              onFocus={() => {
                dispatch(bindTagDropdown());
              }}
            />
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

export default EditJobForm;
