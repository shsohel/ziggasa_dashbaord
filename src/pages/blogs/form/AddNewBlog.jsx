import { useState } from "react";
import { Button } from "../../../utils/custom/Button";
import RichEditor from "../../../utils/custom/Editor";
import FormLayout from "../../../utils/custom/FormLayout";
import InputBox from "../../../utils/custom/InputBox";
import SelectBox from "../../../utils/custom/SelectBox";
import TextArea from "../../../utils/custom/TextAreaBox";
import Modal from "../../../utils/custom/Modal";
import FileUpload from "./FileUpload";

const AddNewBlog = () => {
  const [blogDetails, setBlogDetails] = useState("");
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
      id: "1",
      name: "new-button",
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
          <RichEditor
            id="blog-details"
            name="details"
            value={blogDetails}
            onTextEditorChange={(e) => {
              handleTextEditorOnChange(e);
            }}
          />
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
