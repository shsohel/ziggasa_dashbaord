import { useDispatch } from "react-redux";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { confirmedUser } from "../../store/auth/actions";
import ProgressLoader from "../../utils/custom/ProgressLoader";
import { getIdFromUrl } from "../../utils/utility";

const ConfirmedUser = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isProgressLogin, setIsProgressLogin] = useState(false);
  const token = getIdFromUrl();

  const responseBack = (isSuccess) => {
    if (isSuccess) {
      navigate("/login");
    } else {
      setIsProgressLogin(false);
    }
  };

  const handleForgotPassword = () => {
    setIsProgressLogin(true);
    console.log(token);
    dispatch(confirmedUser(token, responseBack));
  };
  return (
    <div className="bg-white min-h-screen">
      <ProgressLoader isProgress={isProgressLogin}>
        <div className="container">
          <div>
            <div className="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8">
              <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="rounded-sm bg-white py-8 px-4 shadow shadow-primary sm:px-10">
                  <div className="space-y-6">
                    <div>
                      <h2 className=" text-center text-3xl font-bold text-gray-900">
                        User Confirmation
                      </h2>
                    </div>

                    <div className="flex items-center justify-end">
                      <div className="text-sm">
                        <Link
                          to="/login"
                          className="font-medium text-indigo-600 hover:text-indigo-500"
                        >
                          Back to Login
                        </Link>
                      </div>
                    </div>
                    <div>
                      <button
                        onClick={() => {
                          handleForgotPassword();
                        }}
                        className="flex w-full justify-center rounded-md border border-transparent bg-primary py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                      >
                        Confirm
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </ProgressLoader>
    </div>
  );
};

export default ConfirmedUser;
