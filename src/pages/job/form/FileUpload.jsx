import { useDispatch, useSelector } from "react-redux";
import Modal from "../../../utils/custom/Modal";
import { uploadUrl } from "../../../services";
import { replaceImage } from "../../../utils/utility";
import { bindFile, uploadFile } from "../../../store/file-upload";
import { useEffect, useState } from "react";
import moment from "moment";
import InputBox from "../../../utils/custom/InputBox";
import TextArea from "../../../utils/custom/TextAreaBox";
import { Button } from "../../../utils/custom/Button";
import { notify } from "../../../utils/custom/Notification";
import { FaRegTrashAlt } from "react-icons/fa";
const FileUpload = (props) => {
  const dispatch = useDispatch();
  const { isOpen, onClose, onSubmit } = props;
  const { files } = useSelector(({ file }) => file);

  const handleFileSelect = (rowId) => {
    let updatedFiles = [...files].map((file) => ({
      ...file,
      isSelected: file.rowId === rowId ? !file.isSelected : false,
    }));

    dispatch(bindFile(updatedFiles));
  };
  // const handleFileSelects = (index) => {
  //   let allFiles = [...files];
  //   const selectedFile = { ...allFiles[index] };
  //   selectedFile.isSelected = selectedFile.isSelected ? false : true;
  //   allFiles[index] = selectedFile;

  //   dispatch(bindFile(allFiles));
  // };
  // console.log(files);

  const selectedImage = files?.find((f) => f.isSelected);

  const [imageHeight, setImageHeight] = useState();
  const [imageWidth, setImageWidth] = useState();

  const rowId = selectedImage?.rowId ?? "";

  useEffect(() => {
    const width = document.getElementById("uploaded-image")?.naturalWidth ?? 0;
    const height =
      document.getElementById("uploaded-image")?.naturalHeight ?? 0;
    setImageHeight(height);
    setImageWidth(width);
  }, [rowId]);

  const clipboard = async () => {
    try {
      await navigator.clipboard.writeText(
        `${uploadUrl}/${selectedImage?.fileUrl}`,
      );
      notify("success", "File Url Copy successfully!");
    } catch (error) {
      console.log(error);
    }
  };

  const handleRemove = () => {
    let updatedFiles = [...files].map((file) => ({
      ...file,
      isSelected: false,
    }));

    dispatch(bindFile(updatedFiles));
  };

  const handleSelectedImage = (e) => {
    if (selectedImage) {
      const { name, value } = e.target;
      const allFiles = [...files];
      const findIndex = allFiles.findIndex((file) => file.isSelected);
      const file = allFiles.find((file) => file.isSelected);
      const updatedObj = {
        ...file,
        [name]: value,
      };
      allFiles[findIndex] = updatedObj;
      dispatch(bindFile(allFiles));
    }
  };
  const handleRemoveFile = () => {};
  const handleUploadFile = () => {};

  const bindAfterUpload = (fileUrl) => {
    // const images = [
    //   ...product.images,
    //   {
    //     id: uniqId(),
    //     isDefault: false,
    //     url: fileUrl,
    //   },
    // ];
    // const updatedProduct = {
    //   ...product,
    //   images,
    // };
    // dispatch(bindProductBasicInfo(updatedProduct));
  };

  const handleFileUpload = (event) => {
    const { files } = event.target;
    const file = files[0];
    let formData = new FormData();
    formData.append("file", file);

    dispatch(uploadFile({ file: formData }));

    //  dispatch(productImageUpload(formData, bindAfterUpload));
    //const images = [...product.images];
  };

  return (
    <div>
      <Modal
        title="Feature Image"
        isOpen={isOpen}
        openModal={onClose}
        size="lg"
        FooterComponent={
          <div className="flex justify-end gap-6">
            <Button name="Save" onClick={() => {}} />
            <div className=" border  rounded py-1 font-medium cursor-pointer px-2 text-center bg-red-500 ">
              <label htmlFor="fileId">Upload</label>
              <input
                type="file"
                name="name"
                id="fileId"
                accept="image/*"
                autoComplete="given-name"
                className="col-span-4  hidden w-full rounded border-gray-300  text-sm shadow-sm focus:border-primary focus:ring-primary "
                onChange={(e) => {
                  handleFileUpload(e);
                }}
              />
            </div>
          </div>
        }
      >
        <div className="grid grid-cols-2 lg:grid-cols-3 place-content-center">
          <div className="col-span-1 lg:col-span-2 p-1">
            <div className=" flex flex-wrap gap-6 justify-between  h-[400px] custom-scrollbar overflow-y-auto">
              {files.map((file, index) => {
                return (
                  <div className="relative" key={file?.fileUrl}>
                    <img
                      width={100}
                      height={100}
                      className={`object-cover h-40 w-40  p-1 ${
                        file.isSelected ? "border border-primary" : "border"
                      }`}
                      src={`${uploadUrl}/${file.fileUrl}`}
                      onError={replaceImage}
                      onDoubleClick={() => {
                        handleFileSelect(file.rowId);
                      }}
                    />
                    <div
                      className="transition-all duration-500 border border-transparent hover:border-danger absolute top-2 right-2 bg-danger p-1 rounded text-white hover:bg-white hover:text-danger"
                      onClick={() => {
                        handleRemoveFile();
                      }}
                    >
                      <FaRegTrashAlt />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="col-span-1">
            <div className="custom-scrollbar overflow-y-auto h-[400px] ">
              <div className="flex justify-center p-2 ">
                <div className="relative">
                  <img
                    id="uploaded-image"
                    width={100}
                    height={100}
                    className="object-cover object-top w-[300px] h-[150px]  p-1 border  "
                    src={`${uploadUrl}/${selectedImage?.fileUrl}`}
                    onError={replaceImage}
                  />
                  <div
                    hidden={!selectedImage}
                    className="transition-all duration-500 border border-transparent hover:border-danger absolute top-2 right-2 bg-danger p-1 rounded text-white hover:bg-white hover:text-danger"
                    onClick={() => {
                      handleRemove();
                    }}
                  >
                    <FaRegTrashAlt />
                  </div>
                </div>
              </div>
              <div className="p-2 mx-2 text-center italic border-t-2 ">
                <p className="font-light text-sm">{`Demensions: ${imageWidth}*${imageHeight} pixels`}</p>
                <p className="font-light text-sm">{`Date: ${moment(
                  selectedImage?.updatedAt,
                )?.format("DD-MMM-YYYY")}`}</p>
                <p className="font-light text-sm">{`Original Name: ${selectedImage?.fileUrl}`}</p>
              </div>
              <div className="p-2 mx-2  border-t-2 ">
                <InputBox
                  disabled={!selectedImage}
                  label="Alt Text"
                  name="altText"
                  value={selectedImage?.altText}
                  onChange={(e) => {
                    handleSelectedImage(e);
                  }}
                />
                <TextArea
                  disabled={!selectedImage}
                  label="Caption"
                  name="captions"
                  value={selectedImage?.captions}
                  onChange={(e) => {
                    handleSelectedImage(e);
                  }}
                />
                <InputBox
                  disabled={!selectedImage}
                  label="Title"
                  name="title"
                  value={selectedImage?.title}
                  onChange={(e) => {
                    handleSelectedImage(e);
                  }}
                />
                <TextArea
                  disabled={!selectedImage}
                  label="Description"
                  name="descriptions"
                  value={selectedImage?.descriptions}
                  onChange={(e) => {
                    handleSelectedImage(e);
                  }}
                />
                <InputBox
                  classNames="mb-1"
                  label="File URL"
                  disabled={true}
                  value={`${uploadUrl}/${selectedImage?.fileUrl ?? ""}`}
                />
                <Button
                  disabled={!selectedImage}
                  name="Copy"
                  onClick={() => {
                    clipboard();
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default FileUpload;
