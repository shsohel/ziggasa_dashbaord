import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Sidebar from "../../../utils/custom/Sidebar";
import InputBox from "../../../utils/custom/InputBox";
import SelectBox from "../../../utils/custom/SelectBox";
import {
  addTag,
  bindTag,
  bindTagDropdown,
  bindTagSidebar,
  getTags,
  updateTag,
} from "../../../store/tag";
import TextArea from "../../../utils/custom/TextAreaBox";
import { Button } from "../../../utils/custom/Button";
import { HttpStatusCode } from "axios";

const TagModal = () => {
  const dispatch = useDispatch();
  const { tag, tagSidebarOpen, loading, total, queryParams, queryObj } =
    useSelector(({ tag }) => tag);
  const { name, descriptions, parentTag, id } = tag;

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    const updated = {
      ...tag,
      [name]: value,
    };
    dispatch(bindTag(updated));
  };

  const onSubmit = () => {
    const data = {
      queryParams,
      queryObj,
    };
    const obj = {
      id,
      name,
      descriptions,
      isActive: true,
    };

    if (id) {
      dispatch(updateTag(obj)).then((response) => {
        const { payload } = response;
        if (payload.status === HttpStatusCode.Created) {
          dispatch(getTags(data));
        }
      });
    } else {
      dispatch(addTag(obj)).then((response) => {
        const { payload } = response;
        if (payload.status === HttpStatusCode.Created) {
          dispatch(getTags(data));
        }
      });
    }
  };

  const handleClose = () => {
    dispatch(bindTagSidebar(false));
  };
  return (
    <Sidebar
      title="Tag"
      isOpen={tagSidebarOpen}
      handleSidebarModal={handleClose}
      FooterComponent={
        <div className="p-3">
          <Button
            name="Save"
            onClick={() => {
              onSubmit();
            }}
          />
          <Button bgColor="bg-txt-mute" name="Reset" />
        </div>
      }
    >
      <div className="text-dark">
        <InputBox
          labelClass="font-bold"
          label="Name"
          name="name"
          value={name}
          onChange={handleOnChange}
        />
        <TextArea
          labelClass="font-bold"
          label="Description"
          name="descriptions"
          value={descriptions}
          onChange={handleOnChange}
        />
      </div>
    </Sidebar>
  );
};

export default TagModal;
