/** @format */

import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../store/auth/actions";
import InputBox from "../../utils/custom/InputBox";
import ProgressLoader from "../../utils/custom/ProgressLoader";
import { useState } from "react";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isProgressLogin, setIsProgressLogin] = useState(false);
  const [userLogin, setUserLogin] = useState({
    email: "shsohel.tc@gmail.com",
    password: "123456",
  });

  const handleLogin = (e) => {
    const { name, value } = e.target;
    setUserLogin({
      ...userLogin,
      [name]: value,
    });
  };

  const responseBack = (isSuccess) => {
    if (isSuccess) {
      navigate("/");
      setIsProgressLogin(true);
    } else {
      setIsProgressLogin(isSuccess);
    }
  };

  const gotRegister = () => {
    navigate("/register");
  };

  const onLogin = () => {
    setIsProgressLogin(true);
    dispatch(login(userLogin, responseBack));
  };
  return (
    <div className="bg-white min-h-screen">
      <ProgressLoader isProgress={isProgressLogin}>
        <div className="container pt-20">
          <div>
            <div className="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8">
              <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="rounded-sm bg-white py-8 px-4 shadow shadow-primary sm:px-10 text-secondary">
                  <div className="space-y-6">
                    <div>
                      <h2 className=" text-3xl font-bold text-gray-900">
                        Sign in
                      </h2>
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
                          value={userLogin.email}
                          required
                          onChange={(e) => {
                            handleLogin(e);
                          }}
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
                          autoComplete="current-password"
                          value={userLogin.password}
                          required
                          onChange={(e) => {
                            handleLogin(e);
                          }}
                        />
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <input
                          id="remember-me"
                          name="remember-me"
                          type="checkbox"
                          className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                        />
                        <label
                          htmlFor="remember-me"
                          className="ml-2 block text-sm text-gray-900"
                        >
                          Remember me
                        </label>
                      </div>

                      <div className="text-sm">
                        <Link
                          to="/forgot-password"
                          className="font-medium text-indigo-600 hover:text-indigo-500"
                        >
                          Forgot your password?
                        </Link>
                      </div>
                    </div>

                    <div>
                      <button
                        type="submit"
                        onClick={() => {
                          onLogin();
                        }}
                        className="flex w-full justify-center rounded-md border border-transparent bg-primary py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                      >
                        Sign in
                      </button>
                      <div className="text-center font-semibold italic">
                        Or,
                      </div>

                      <button
                        onClick={() => {
                          gotRegister();
                        }}
                        className="mt-2 flex w-full justify-center rounded-md border border-transparent bg-secondary py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                      >
                        Register
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

export default Login;
