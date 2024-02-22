import React, { useState } from "react";
import RichEditor from "../../../utils/custom/Editor";
import { useDispatch, useSelector } from "react-redux";
import { bindBlog } from "../../../store/blog";

const BlogDescriptions = () => {
  const dispatch = useDispatch();
  const [blogDetails, setBlogDetails] = useState("");
  const { blog } = useSelector(({ blog }) => blog);
  const { details } = blog;

  const handleTextEditorOnChange = (e) => {
    const { name, value } = e.target;
    const updated = {
      ...blog,
      [name]: value,
    };
    dispatch(bindBlog(updated));
  };
  return (
    <RichEditor
      id="blog-details-d"
      name="details"
      value={details}
      onTextEditorChange={(e) => {
        handleTextEditorOnChange(e);
      }}
    />
  );
};

export default BlogDescriptions;
