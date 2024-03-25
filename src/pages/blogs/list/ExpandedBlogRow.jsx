import React, { useState } from "react";
import InputBox from "../../../utils/custom/InputBox";
import { Button } from "../../../utils/custom/Button";
import { useDispatch } from "react-redux";
import { updateBlog } from "../../../store/blog";
const ExpandedBlogRow = (props) => {
  const { data, getAllBlogs } = props;
  const dispatch = useDispatch();
  const [slugState, setSlugState] = useState(data?.slug);
  const handleOnChange = (value) => {
    setSlugState(value);
  };
  const handleUpdateSlug = () => {
    dispatch(
      updateBlog({
        blog: {
          id: data?._id,
          slug: slugState,
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
        value={slugState}
        onChange={(e) => {
          handleOnChange(e.target.value);
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
