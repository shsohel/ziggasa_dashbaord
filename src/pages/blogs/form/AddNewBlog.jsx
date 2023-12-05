import { Button } from '../../../utils/custom/Button';
import RichEditor from '../../../utils/custom/Editor';
import FormLayout from '../../../utils/custom/FormLayout';
import InputBox from '../../../utils/custom/InputBox';

const AddNewBlog = () => {
  const actions = [
    {
      id: '1',
      name: 'new-button',
      button: <Button id="save-button" name="Save" onClick={() => {}} />,
    },
  ];

  return (
    <FormLayout title="New Blog" actions={actions}>
      <div>
        <InputBox name="Title" placeholder="Title" />
      </div>
      <div>
        <RichEditor />
      </div>
    </FormLayout>
  );
};

export default AddNewBlog;
