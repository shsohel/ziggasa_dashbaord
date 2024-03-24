import React, { useEffect } from "react";
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
import SelectBox from "../../../utils/custom/SelectBox";
import { createOption } from "../../../utils/utility";

const CompanyModal = () => {
  const dispatch = useDispatch();
  const { company, companySidebarOpen, loading, total, queryParams, queryObj } =
    useSelector(({ company }) => company);
  const {
    id,
    name,
    email,
    mobileNumber,
    phoneNumber,
    details,
    technologies,
    companyBenefits,
    ceo,
    foundedIn,
    employees,
    markets,
    countries,
    logoUrl,
    isActive,
  } = company;

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
      email,
      mobileNumber,
      phoneNumber,
      details,
      technologies: technologies?.map((tech) => tech.label),
      companyBenefits: companyBenefits?.map((tech) => tech.label),
      countries: countries?.map((tech) => tech.label),
      markets: markets?.map((tech) => tech.label),
      ceo,
      foundedIn,
      employees,
      logoUrl,
      isActive,
    };
    console.log("obj", JSON.stringify(obj, null, 2));

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

  const handleDropdownOnChange = (data, e) => {
    const { name } = e;
    const updated = {
      ...company,
      [name]: data,
    };
    dispatch(bindCompany(updated));
  };

  const handleClose = () => {
    dispatch(bindCompany(null));
    dispatch(bindCompanySidebar(false));
  };

  const handleCreate = (inputValue) => {
    // console.log(inputValue);
    // console.log(createOption(inputValue));
  };
  return (
    <Sidebar
      title="Company"
      isOpen={companySidebarOpen}
      handleSidebarModal={handleClose}
      FooterComponent={
        <div className="p-3">
          <Button
            label="Save"
            onClick={() => {
              onSubmit();
            }}
          />
          <Button bgColor="bg-txt-mute" label="Reset" />
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
        <InputBox
          labelClass="font-bold"
          type="email"
          label="Email"
          name="email"
          value={email}
          onChange={handleOnChange}
        />
        <InputBox
          labelClass="font-bold"
          label="Mobile"
          name="mobileNumber"
          value={mobileNumber}
          onChange={handleOnChange}
        />
        <InputBox
          labelClass="font-bold"
          label="Phone"
          name="phoneNumber"
          value={phoneNumber}
          onChange={handleOnChange}
        />
        <SelectBox
          id="technologies"
          name="technologies"
          label="Technologies"
          isCreatable={true}
          isMulti={true}
          options={[]}
          value={technologies}
          onChange={(data, e) => {
            handleDropdownOnChange(data, e);
          }}
          onFocus={() => {
            // dispatch(bindCategoryDropdown());
          }}
        />
        <SelectBox
          id="companyBenefits"
          name="companyBenefits"
          label="Company Benefits"
          isCreatable={true}
          isMulti={true}
          options={[]}
          value={companyBenefits}
          // onCreateOption={handleCreate}
          onChange={(data, e) => {
            handleDropdownOnChange(data, e);
          }}
          onFocus={() => {
            // dispatch(bindCategoryDropdown());
          }}
        />
        <InputBox
          label="CEO"
          name="ceo"
          value={ceo}
          onChange={handleOnChange}
        />
        <InputBox
          label="Founded In"
          name="foundedIn"
          value={foundedIn}
          onChange={handleOnChange}
        />
        <InputBox
          label="No of Employees"
          type="number"
          name="employees"
          value={employees}
          onChange={handleOnChange}
        />
        <SelectBox
          id="markets"
          name="markets"
          label="Markets"
          isCreatable={true}
          isMulti={true}
          options={[]}
          value={markets}
          // onCreateOption={handleCreate}
          onChange={(data, e) => {
            handleDropdownOnChange(data, e);
          }}
          onFocus={() => {
            // dispatch(bindCategoryDropdown());
          }}
        />
        <SelectBox
          id="countries"
          name="countries"
          label="Countries"
          isCreatable={true}
          isMulti={true}
          options={[]}
          value={countries}
          // onCreateOption={handleCreate}
          onChange={(data, e) => {
            handleDropdownOnChange(data, e);
          }}
          onFocus={() => {
            // dispatch(bindCategoryDropdown());
          }}
        />
        <TextArea
          labelClass="font-bold"
          label="Description"
          name="details"
          value={details}
          onChange={handleOnChange}
        />
      </div>
    </Sidebar>
  );
};

export default CompanyModal;
