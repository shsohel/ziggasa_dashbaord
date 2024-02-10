import { useSelector } from 'react-redux';
import Modal from '../../../utils/custom/Modal';
import { uploadUrl } from '../../../services';
import { replaceImage } from '../../../utils/utility';

const FileUpload = (props) => {
  const { isOpen, onClose, onSubmit } = props;
  const { files } = useSelector(({ file }) => file);
  return (
    <div>
      <Modal title="File Upload" isOpen={isOpen} openModal={onClose} size="lg">
        <div className="grid grid-cols-3">
          <div className="col-span-2">
            <div className="flex flex-wrap gap-6 justify-between overflow-y-auto h-[400px]">
              {files.map((file) => {
                return (
                  <img
                    key={file?.fileUrl}
                    className=" object-cover h-40 w-40 border p-1"
                    src={`${uploadUrl}/${file.fileUrl}`}
                    onError={replaceImage}
                  />
                );
              })}
            </div>
          </div>
          <div className="col-span-1">s</div>
        </div>
      </Modal>
    </div>
  );
};

export default FileUpload;
