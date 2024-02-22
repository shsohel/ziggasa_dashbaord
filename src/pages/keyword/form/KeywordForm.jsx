import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Sidebar from "../../../utils/custom/Sidebar";
import InputBox from "../../../utils/custom/InputBox";
import SelectBox from "../../../utils/custom/SelectBox";
import {
  addKeyword,
  bindKeyword,
  bindKeywordDropdown,
  bindKeywordSidebar,
  getKeywords,
  updateKeyword,
} from "../../../store/keyword";
import TextArea from "../../../utils/custom/TextAreaBox";
import { Button } from "../../../utils/custom/Button";
import { HttpStatusCode } from "axios";

const KeywordForm = () => {
  const dispatch = useDispatch();
  const {
    keywordDropdown,
    isKeywordDropdownLoaded,
    keyword,
    keywordSidebarOpen,
    loading,
    total,
    queryParams,
    queryObj,
  } = useSelector(({ keyword }) => keyword);
  const { name, descriptions, parentKeyword, id } = keyword;

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    const updated = {
      ...keyword,
      [name]: value,
    };
    dispatch(bindKeyword(updated));
  };

  const handleDropdownOnChange = (data, e) => {
    const { name } = e;
    const updated = {
      ...keyword,
      [name]: data,
    };
    dispatch(bindKeyword(updated));
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
    !parentKeyword && delete obj.parentKeyword;

    if (id) {
      dispatch(updateKeyword(obj)).then((response) => {
        const { payload } = response;
        if (payload.status === HttpStatusCode.Created) {
          dispatch(getKeywords(data));
        }
      });
    } else {
      dispatch(addKeyword(obj)).then((response) => {
        const { payload } = response;
        if (payload.status === HttpStatusCode.Created) {
          dispatch(getKeywords(data));
        }
      });
    }
  };

  const handleClose = () => {
    dispatch(bindKeywordSidebar(false));
  };
  return (
    <Sidebar
      title="Keyword"
      isOpen={keywordSidebarOpen}
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

export default KeywordForm;
