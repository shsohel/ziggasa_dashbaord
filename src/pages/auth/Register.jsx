import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { register } from "../../store/auth/actions";
import ProgressLoader from "../../utils/custom/ProgressLoader";
import InputBox from "../../utils/custom/InputBox";

const initialValue = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
  role: "user",
};
const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [user, setUser] = useState(initialValue);
  const [isProgressLogin, setIsProgressLogin] = useState(false);

  const { name, email, password, confirmPassword } = user;

  const ValidationSchema = yup.object().shape({
    name: name.length
      ? yup.string()
      : yup.string().required("Name is required!!"),
    email: email.length
      ? yup.string()
      : yup.string().required("Email is required!!"),
    password: password.length
      ? yup.string()
      : yup.string().required("Password is required!!"),
  });
  const {
    reset,
    formState: { errors },
    handleSubmit,
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(ValidationSchema),
  });
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const goLogin = () => {
    navigate("/login");
  };

  const callBackResponse = (isSuccess) => {
    if (isSuccess) {
      navigate("/login");
    } else {
      setIsProgressLogin(false);
    }
  };
  const onSubmit = () => {
    console.log("user", JSON.stringify(user, null, 2));
    setIsProgressLogin(true);

    dispatch(register(user, callBackResponse));
  };

  return (
    <div className="bg-white min-h-screen">
      <ProgressLoader isProgress={isProgressLogin}>
        <div className="container">
          <div className="pt-24">
            <div className="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8">
              <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="rounded-sm bg-white py-8 px-4 shadow shadow-primary sm:px-10">
                  <div className="space-y-6">
                    <div>
                      <h2 className=" text-3xl font-bold text-gray-900">
                        Register
                      </h2>
                    </div>
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Name
                      </label>
                      <div className="mt-1">
                        <InputBox
                          id="name"
                          name="name"
                          type="text"
                          autoComplete="name"
                          value={name}
                          onChange={(e) => {
                            handleOnChange(e);
                          }}
                          invalidMassage={errors.name?.message}
                          invalid={errors && errors.name && !name.length}
                        />
                      </div>
                    </div>
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Email address
                      </label>
                      <div className="mt-1">
                        <InputBox
                          id="email"
                          name="email"
                          type="email"
                          autoComplete="email"
                          value={email}
                          onChange={(e) => {
                            handleOnChange(e);
                          }}
                          invalidMassage={errors.email?.message}
                          invalid={errors && errors.email && !email.length}
                        />
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="password"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Password
                      </label>
                      <div className="mt-1">
                        <InputBox
                          id="password"
                          name="password"
                          type="password"
                          autoComplete="password"
                          value={password}
                          onChange={(e) => {
                            handleOnChange(e);
                          }}
                          invalidMassage={errors.password?.message}
                          invalid={
                            errors && errors.password && !password.length
                          }
                        />
                      </div>
                    </div>

                    <div>
                      <button
                        onClick={handleSubmit(onSubmit)}
                        className="flex w-full justify-center rounded-md border border-transparent bg-primary py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                      >
                        Register
                      </button>

                      <div className="text-center font-semibold italic">
                        Or,
                      </div>

                      <button
                        onClick={() => {
                          goLogin();
                        }}
                        className="mt-2 flex w-full justify-center rounded-md border border-transparent bg-secondary py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                      >
                        Login
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

export default Register;
