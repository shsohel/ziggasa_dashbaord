import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Sidebar from "../../../utils/custom/Sidebar";
import InputBox from "../../../utils/custom/InputBox";
import {
  addCompany,
  bindCompany,
  bindCompanySidebar,
  getCompanies,
  updateCompany,
} from "../../../store/company";
import TextArea from "../../../utils/custom/TextAreaBox";
import { Button } from "../../../utils/custom/Button";
import { HttpStatusCode } from "axios";

const CompanyModal = () => {
  const dispatch = useDispatch();
  const { company, companySidebarOpen, loading, total, queryParams, queryObj } =
    useSelector(({ company }) => company);
  const { name, descriptions, parentCompany, id } = company;

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    const updated = {
      ...company,
      [name]: value,
    };
    dispatch(bindCompany(updated));
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
      dispatch(updateCompany(obj)).then((response) => {
        const { payload } = response;
        if (payload.status === HttpStatusCode.Created) {
          dispatch(getCompanies(data));
        }
      });
    } else {
      dispatch(addCompany(obj)).then((response) => {
        const { payload } = response;
        if (payload.status === HttpStatusCode.Created) {
          dispatch(getCompanies(data));
        }
      });
    }
  };

  const handleClose = () => {
    dispatch(bindCompanySidebar(false));
  };
  return (
    <Sidebar
      title="Company"
      isOpen={companySidebarOpen}
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

export default CompanyModal;
