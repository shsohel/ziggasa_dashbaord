import React, { useState } from "react";
import { useDispatch } from "react-redux";
import Logo from "../../components/custom/Logo";
import { forgotPassword } from "../../store/auth/actions";
import ProgressLoader from "components/custom/loader/ProgressLoader";
import Layout from "components/Layout";

const ForgotPassword = () => {
  const dispatch = useDispatch();
  const [isProgressLogin, setIsProgressLogin] = useState(false);

  const responseBack = () => {
    setIsProgressLogin(false);
  };
  const [email, setEmail] = useState("");

  const handleForgotPassword = () => {
    setIsProgressLogin(true);

    const obj = {
      email,
    };
    dispatch(forgotPassword(obj, responseBack));
  };
  return (
    <Layout title="Forgot Password">
      <ProgressLoader isProgress={isProgressLogin}>
        <div className="container">
          <div className="my-[4.5rem] lg:mt-[9rem]">
            <div className="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8">
              <div className="mx-auto ">
                <Logo />
              </div>

              <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="rounded-sm bg-white py-8 px-4 shadow shadow-primary sm:px-10">
                  <div className="space-y-6">
                    <div>
                      <h2 className=" text-3xl font-bold text-gray-900">
                        Forgot Password
                      </h2>
                    </div>
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Email
                      </label>
                      <div className="mt-1">
                        <input
                          id="email"
                          name="email"
                          type="email"
                          autoComplete="email"
                          required
                          className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                          onChange={(e) => {
                            setEmail(e.target.value);
                          }}
                        />
                      </div>
                    </div>
                    <div className="flex items-center justify-end">
                      <div className="text-sm">
                        <a
                          href="/auth/login"
                          className="font-medium text-indigo-600 hover:text-indigo-500"
                        >
                          Back to Login
                        </a>
                      </div>
                    </div>
                    <div>
                      <button
                        onClick={() => {
                          handleForgotPassword();
                        }}
                        className="flex w-full justify-center rounded-md border border-transparent bg-primary py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                      >
                        Send Mail
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </ProgressLoader>
    </Layout>
  );
};

export default ForgotPassword;
