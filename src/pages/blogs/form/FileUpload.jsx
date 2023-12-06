import Modal from "../../../utils/custom/Modal";

const FileUpload = (props) => {
  const { isOpen, onClose, onSubmit } = props;
  return (
    <div>
      <Modal isOpen={isOpen} openModal={onClose} size="xl">
        {null}
      </Modal>
    </div>
  );
};

export default FileUpload;
