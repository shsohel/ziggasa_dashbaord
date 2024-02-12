/* eslint-disable no-unused-vars */
import PropTypes from "prop-types";
import { Editor } from "@tinymce/tinymce-react";
import { useState } from "react";
import { baseAxios, uploadUrl } from "../../services";
import { apiEndpoints } from "../../services/apis";

export default function RichEditor(props) {
  const { apiKey, id, name, value, onTextEditorChange } = props;
  // const [editorValue, setEditorValue] = useState("");
  // const [text, setText] = useState("");

  const handleEditor = (newValue) => {
    const target = {
      name,
      value: newValue,
    };
    const event = {
      target,
    };
    onTextEditorChange(event);
    // setText(editor.getContent({ format: 'text' }));
  };

  const handleImageUpload = (file, success, failure, progress) => {
    const apiEndPoint = `${apiEndpoints.file}/photo`;
    // Simulating an image upload using a Promise
    return new Promise((resolve, reject) => {
      const formData = new FormData();
      formData.append("file", file.blob(), file.filename());

      baseAxios
        .post(apiEndPoint, formData)
        .then((response) => {
          const { data } = response;

          // On successful upload, resolve the Promise with the image URL
          const imageUrl = `${uploadUrl}/${data.data.fileUrl}`; // Replace this with the actual URL returned from your server
          resolve(imageUrl);
        })
        .catch((error) => {
          console.log(error);
          reject(error);
        });
    });
  };
  return (
    <Editor
      apiKey={apiKey}
      id={id}
      init={{
        plugins:
          "anchor autolink charmap codesample emoticons image   link lists media searchreplace table visualblocks wordcount code",
        toolbar:
          "undo redo |blocks fontfamily fontsize | link image media table |  bold italic underline strikethrough | align lineheight | numlist bullist indent outdent | emoticons charmap | removeformat",
        images_upload_handler: handleImageUpload,
        // images_upload_base_path: '/some/basepath', // O, // Optional base path for image uploads
        images_upload_credentials: true, // Optional, if you need to send credentials when uploading images
      }}
      // onInit={(evt, editor) => {
      //   setText(editor.getContent({ format: 'text' }));
      // }}
      onEditorChange={(newValue, editor) => {
        handleEditor(newValue, editor);
      }}
      value={value}
    />
  );
}

// ** Default Props
RichEditor.defaultProps = {
  id: "editor-id",
  apiKey: "slwfm4ezfjmxksie2h6ssq4owjjpxpm5ew3a2hbg4pn0k23j",
};

// ** PropTypes
RichEditor.propTypes = {
  id: PropTypes.string.isRequired,
  onTextEditorChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  apiKey: PropTypes.string.isRequired,
};

// imagetools
