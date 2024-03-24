import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addNewUser, bindUserBasicInfo } from "../../../store/user";
import { Button } from "../../../utils/custom/Button";
import InputBox from "../../../utils/custom/InputBox";
import Sidebar from "../../../utils/custom/Sidebar";
import { replaceImage } from "../../../utils/utility";

const UserAddForm = ({ isOpen, setIsOpen }) => {
  const { user } = useSelector(({ users }) => users);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleOnSubmit = () => {
    const { name, email, password } = user;
    const submittedData = {
      name,
      email,
      password,
    };
    dispatch(addNewUser(submittedData));
    console.log("submitted");
    // handleSidebarModal()
  };

  const handleClose = () => {
    setIsOpen(!isOpen);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    dispatch(bindUserBasicInfo({ ...user, [name]: value }));
  };

  const FooterComponent = () => {
    return (
      <div className="flex gap-3 p-2">
        <Button
          label="Save"
          onClick={() => {
            handleOnSubmit();
          }}
        />
        <Button label="Cancel" bgColor="bg-danger" textColor="text-white" />
        <Button label="Reset" bgColor="bg-warning" />
      </div>
    );
  };

  return (
    <>
      <Sidebar
        title="User"
        isOpen={isOpen}
        handleSidebarModal={handleClose}
        FooterComponent={<FooterComponent />}
      >
        <div>
          <div className="flex justify-center">
            <img src="" onError={replaceImage} />
          </div>
          <InputBox
            name="name"
            label="Name"
            value={user.name}
            onChange={(e) => {
              handleInputChange(e);
            }}
          />
          <InputBox
            name="email"
            label="Email"
            labelClass="mt-2"
            value={user.email}
            onChange={(e) => {
              handleInputChange(e);
            }}
          />
          <InputBox
            name="password"
            label="Password"
            labelClass="mt-2"
            value={user.password}
            onChange={(e) => {
              handleInputChange(e);
            }}
          />
          <div className="mt-3 flex gap-2 items-center">
            <input
              type="checkbox"
              name="isActive"
              value={user.isActive}
              onChange={(e) => {
                handleInputChange(e);
              }}
            />
            <label>Is Active</label>
          </div>
        </div>
      </Sidebar>
    </>
  );
};

export default UserAddForm;
