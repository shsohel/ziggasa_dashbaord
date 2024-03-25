import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Sidebar from "../../../utils/custom/Sidebar";
import InputBox from "../../../utils/custom/InputBox";
import {
  addSkill,
  bindSkill,
  bindSkillSidebar,
  getSkills,
  updateSkill,
} from "../../../store/skill";
import TextArea from "../../../utils/custom/TextAreaBox";
import { Button } from "../../../utils/custom/Button";
import { HttpStatusCode } from "axios";

const SkillForm = () => {
  const dispatch = useDispatch();
  const { skill, skillSidebarOpen, loading, total, queryParams, queryObj } =
    useSelector(({ skill }) => skill);
  const { name, descriptions, parentSkill, id } = skill;

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    const updated = {
      ...skill,
      [name]: value,
    };
    dispatch(bindSkill(updated));
  };

  const handleDropdownOnChange = (data, e) => {
    const { name } = e;
    const updated = {
      ...skill,
      [name]: data,
    };
    dispatch(bindSkill(updated));
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
    !parentSkill && delete obj.parentSkill;

    if (id) {
      dispatch(updateSkill(obj)).then((response) => {
        const { payload } = response;
        if (payload.status === HttpStatusCode.Created) {
          dispatch(getSkills(data));
        }
      });
    } else {
      dispatch(addSkill(obj)).then((response) => {
        const { payload } = response;
        if (payload.status === HttpStatusCode.Created) {
          dispatch(getSkills(data));
        }
      });
    }
  };

  const handleClose = () => {
    dispatch(bindSkillSidebar(false));
  };
  return (
    <Sidebar
      title="Skill"
      isOpen={skillSidebarOpen}
      handleSidebarModal={handleClose}
      FooterComponent={
        <div className="p-3">
          <Button
            label="Save"
            onClick={() => {
              onSubmit();
            }}
          />
          <Button label="Reset" />
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

export default SkillForm;
