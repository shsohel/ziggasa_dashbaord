/** @format */

import { useDispatch, useSelector } from "react-redux";

import { useEffect, useState } from "react";
import moment from "moment";

import { FaRegTrashAlt } from "react-icons/fa";
import { isEmpty } from "lodash";
import {
  bindFiles,
  deleteFile,
  getFilesByQuery,
  uploadFile,
} from "../store/file-upload";
import { uploadUrl } from "../services";
import { notify } from "../utils/custom/Notification";
import { confirmDialog } from "../utils/custom/ConfirmDialogBox";
import { confirmObj } from "../utils/enum";
import Modal from "../utils/custom/Modal";
import { Button } from "../utils/custom/Button";
import { replaceImage } from "../utils/utility";
import InputBox from "../utils/custom/InputBox";
import TextArea from "../utils/custom/TextAreaBox";
const SingleFileUpload = (props) => {
  const dispatch = useDispatch();
  const { isOpen, onClose, onSubmit } = props;
  const { files, file, loading, pagination } = useSelector(({ file }) => file);
  const [imageHeight, setImageHeight] = useState();
  const [imageWidth, setImageWidth] = useState();

  const selectedImage = files?.find((f) => f.isSelected);

  const rowId = selectedImage?.rowId ?? "";

  useEffect(() => {
    const width = document.getElementById("uploaded-image")?.naturalWidth ?? 0;
    const height =
      document.getElementById("uploaded-image")?.naturalHeight ?? 0;
    setImageHeight(height);
    setImageWidth(width);
  }, [rowId]);

  const handleFileSelect = (rowId) => {
    let updatedFiles = [...files].map((file) => ({
      ...file,
      isSelected: file.rowId === rowId ? !file.isSelected : false,
    }));

    dispatch(bindFiles(updatedFiles));
  };

  const clipboard = async () => {
    try {
      await navigator.clipboard.writeText(
        `${uploadUrl}/${selectedImage?.fileUrl}`
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

    dispatch(bindFiles(updatedFiles));
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
      dispatch(bindFiles(allFiles));
    }
  };

  const handleFileDelete = (fileName) => {
    confirmDialog(confirmObj).then(async (e) => {
      if (e.isConfirmed) {
        dispatch(deleteFile({ fileName }));
      }
    });
  };

  const handleFileUpload = (event) => {
    const { files } = event.target;
    const file = files[0];
    if (file) {
      let formData = new FormData();
      formData.append("file", file);

      dispatch(uploadFile({ file: formData }));
    }
  };
  const fetchData = () => {
    const { next } = pagination;
    const { page, limit } = next;
    const query = {
      page: 1,
      limit: page * limit,
      sort: "createdAt",
      orderBy: "desc",
    };

    dispatch(getFilesByQuery({ queryParams: query }));
  };

  const handleScroll = (e) => {
    const bottom =
      e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;
    if (bottom && !isEmpty(pagination) && !loading) {
      fetchData();
    }
  };

  const handleModalDataSubmit = () => {
    onSubmit(selectedImage);
  };
  return (
    <div>
      <Modal
        title="Feature Image"
        isOpen={isOpen}
        openModal={onClose}
        size="lg"
        FooterComponent={
          <div className="flex justify-end items-center gap-6">
            <Button
              name="Save"
              onClick={() => {
                handleModalDataSubmit();
              }}
            />
            <div>
              <label
                className=" border cursor-pointer py-[0.4rem] px-3 text-center  bg-secondary hover:bg-primary hover:text-secondary text-white rounded text-sm font-semibold transition-all duration-500 "
                htmlFor="fileId"
              >
                Upload
              </label>
              <input
                type="file"
                name="name"
                id="fileId"
                accept="image/*"
                autoComplete="given-name"
                className="  hidden  "
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
            <div
              id="filesId"
              onScroll={handleScroll}
              className=" flex flex-wrap gap-6   overflow-y-auto h-[400px] "
            >
              {files.map((file) => {
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
                      alt={file.fileUrl}
                    />
                    <div
                      className="transition-all duration-500 border border-transparent hover:border-danger absolute top-2 right-2 bg-danger p-1 rounded text-white hover:bg-white hover:text-danger"
                      onClick={() => {
                        handleFileDelete(file.fileUrl);
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
            <div className=" overflow-y-auto h-[400px] ">
              <div className="flex justify-center p-2 ">
                <div className="relative">
                  <img
                    id="uploaded-image"
                    width={100}
                    height={100}
                    className="object-cover object-top w-[300px] h-[150px]  p-1 border  "
                    src={`${uploadUrl}/${selectedImage?.fileUrl ?? ""}`}
                    onError={replaceImage}
                    alt={file.altText}
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
                  selectedImage?.updatedAt
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
                  onChange={() => {}}
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

export default SingleFileUpload;
