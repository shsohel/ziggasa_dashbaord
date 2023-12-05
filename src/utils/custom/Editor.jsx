/* eslint-disable no-unused-vars */
import { Editor } from '@tinymce/tinymce-react';
import { useState } from 'react';

export default function RichEditor() {
  const [editorValue, setEditorValue] = useState('');
  const [text, setText] = useState('');

  const handleEditor = (newValue, editor) => {
    setEditorValue(newValue);
    setText(editor.getContent({ format: 'text' }));
  };

  const handleImageUpload = (file, success, failure, progress) => {
    // Simulating an image upload using a Promise
    return new Promise((resolve, reject) => {
      const formData = new FormData();
      formData.append('file', file.blob(), file.filename());

      // Your actual upload logic (replace with your backend upload endpoint)
      fetch('http://localhost:5000/api/v1/fileupload/photo', {
        method: 'POST',
        body: formData,
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then((data) => {
          console.log(data.data.fileUrl);
          // On successful upload, resolve the Promise with the image URL
          const imageUrl = `http://localhost:5000/uploads/${data.data.fileUrl}`; // Replace this with the actual URL returned from your server
          resolve(imageUrl);
        })
        .catch((error) => {
          // If upload fails, reject the Promise
          reject(error);
        });
    });
  };
  return (
    <Editor
      apiKey="slwfm4ezfjmxksie2h6ssq4owjjpxpm5ew3a2hbg4pn0k23j"
      id="your-id"
      init={{
        plugins:
          'anchor autolink charmap codesample emoticons image imagetools  link lists media searchreplace table visualblocks wordcount code',
        toolbar:
          'image | undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table | align lineheight | numlist bullist indent outdent | emoticons charmap | removeformat',
        images_upload_handler: handleImageUpload,
        // images_upload_base_path: '/some/basepath', // O, // Optional base path for image uploads
        images_upload_credentials: true, // Optional, if you need to send credentials when uploading images
      }}
      onInit={(evt, editor) => {
        setText(editor.getContent({ format: 'text' }));
      }}
      onEditorChange={(newValue, editor) => {
        handleEditor(newValue, editor);
      }}
      value={editorValue}
    />
  );
}
