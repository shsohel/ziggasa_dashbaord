import React, { useState } from "react";
import InputBox from "../../../utils/custom/InputBox";
import { Button } from "../../../utils/custom/Button";
import { useDispatch } from "react-redux";
import { updateBlog } from "../../../store/blog";
const ExpandedBlogRow = (props) => {
  const { data, getAllBlogs } = props;
  const dispatch = useDispatch();
  const [blogState, setBlogState] = useState({
    slug: data?.slug,
    count: data?.count,
  });

  const handleOnChange = (e) => {
    const { value, name, type } = e.target;
    setBlogState({
      ...blogState,
      [name]: type === "number" ? Number(value) : value,
    });
  };
  const handleUpdateSlug = () => {
    dispatch(
      updateBlog({
        blog: {
          id: data?._id,
          ...blogState,
        },
      }),
    )
      .then((response) => {
        console.log(response);

        getAllBlogs();
      })
      .catch((error) => {
        const { response } = error;
        console.log(response);
      });
  };
  return (
    <div className="p-4">
      <InputBox
        label="URl"
        name="slug"
        value={blogState?.slug}
        onChange={(e) => {
          handleOnChange(e);
        }}
      />
      <InputBox
        type="number"
        label="View"
        name="count"
        value={blogState?.count}
        onChange={(e) => {
          handleOnChange(e);
        }}
      />
      <div className="my-2">
        <Button
          id="update-slug"
          label="Update"
          onClick={() => {
            handleUpdateSlug();
          }}
        />
      </div>
    </div>
  );
};

export default ExpandedBlogRow;
