import axios from 'axios';
import { notify } from '../../../utils/custom/Notification';
import { status } from '../../../utils/enum';

export const photoUpload = (file, callback) => (dispatch) => {
  const apiEndPoint = `http://localhost:8082/api/v1/fileupload/photo`;
  axios
    .post(apiEndPoint, file)
    .then((response) => {
      if (response.status === 200) {
        callback(response.data.data.fileUrl);
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

export const fileUpload = (file, callback) => (dispatch, getState) => {
  const apiEndPoint = `http://localhost:8082/api/v1/fileupload/photo`;
  axios.post(apiEndPoint, file).then((response) => {
    if (response.status === 200) {
      callback(response.data.data.fileUrl);
    }
  });
};
export const deleteFile = (fileName, fileId, callback) => (dispatch) => {
  const apiEndPoint = `/api/file-upload/${fileName}`;
  axios
    .delete(apiEndPoint)
    .then((response) => {
      if (response.status === status.success) {
        notify('success', `The file has been deleted successfully`);
        callback(fileId);
      }
    })
    .catch(({ response }) => {
      if (response?.status === status.severError) {
        notify('error', `Please contact the support team!!!`);
      } else if (response?.status === status.badRequest) {
        notify('error', response.data.error);
      }
    });
};
