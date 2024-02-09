import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Sidebar from '../../../utils/custom/Sidebar';
import InputBox from '../../../utils/custom/InputBox';
import SelectBox from '../../../utils/custom/SelectBox';
import {
  addCategory,
  bindCategory,
  bindCategoryDropdown,
  bindCategorySidebar,
  getCategories,
} from '../../../store/category';
import TextArea from '../../../utils/custom/TextAreaBox';
import { Button } from '../../../utils/custom/Button';
import { HttpStatusCode } from 'axios';

const CategoryModal = () => {
  const dispatch = useDispatch();
  const {
    categoryDropdown,
    isCategoryDropdownLoaded,
    category,
    categorySidebarOpen,
    loading,
    total,
  } = useSelector(({ category }) => category);
  const { name, description, parentCategory } = category;

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    const updated = {
      ...category,
      [name]: value,
    };
    dispatch(bindCategory(updated));
  };

  const handleDropdownOnChange = (data, e) => {
    const { name } = e;
    const updated = {
      ...category,
      [name]: data,
    };
    dispatch(bindCategory(updated));
  };

  const onSubmit = () => {
    const obj = {
      name,
      description,
      parentCategory: parentCategory?.value ?? '',
      isParent: parentCategory ? false : true,
      isActive: true,
    };
    !parentCategory && delete obj.parentCategory;

    dispatch(addCategory(obj));
  };

  const handleClose = () => {
    dispatch(bindCategorySidebar(false));
  };
  return (
    <Sidebar
      isOpen={categorySidebarOpen}
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
          name="description"
          value={description}
          onChange={handleOnChange}
        />
        <SelectBox
          id="category"
          name="parentCategory"
          isLoading={!isCategoryDropdownLoaded}
          label="Category"
          options={categoryDropdown}
          value={parentCategory}
          onChange={(data, e) => {
            handleDropdownOnChange(data, e);
          }}
          onFocus={() => {
            dispatch(bindCategoryDropdown());
          }}
        />
      </div>
    </Sidebar>
  );
};

export default CategoryModal;
