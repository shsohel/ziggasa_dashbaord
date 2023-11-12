import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import Logo from '../../../components/custom/Logo';
import { resetPassword } from '../../../store/auth/actions';
import Layout from 'components/Layout';
import ProgressLoader from 'components/custom/loader/ProgressLoader';

const ResetPassword = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [isProgressLogin, setIsProgressLogin] = useState(false);

  const { token } = router.query;

  const [reset, setReset] = useState({
    password: '',
    confirmPassword: '',
  });

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setReset({
      ...reset,
      [name]: value,
    });
  };

  const responseBack = (isSuccess) => {
    if (isSuccess) {
      router.push('/auth/login');
      // setIsProgressLogin(false);
    } else {
      setIsProgressLogin(isSuccess);
    }
  };

  const handleSubmit = () => {
    setIsProgressLogin(true);
    const obj = {
      password: reset.password,
      token,
    };

    dispatch(resetPassword(obj, responseBack));
  };

  return (
    <Layout title="Reset Password">
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
                    <h2 className=" text-3xl font-bold text-gray-900">
                      Reset Password
                    </h2>
                    <div>
                      <label
                        htmlFor="password"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Password
                      </label>
                      <div className="mt-1">
                        <input
                          id="password"
                          name="password"
                          type="password"
                          autoComplete="password"
                          required
                          className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                          onChange={(e) => {
                            handleOnChange(e);
                          }}
                        />
                      </div>
                    </div>
                    <div>
                      <label
                        htmlFor="password"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Confirm Password
                      </label>
                      <div className="mt-1">
                        <input
                          id="confirmPassword"
                          name="confirmPassword"
                          type="password"
                          autoComplete="confirm-password"
                          required
                          className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                          onChange={(e) => {
                            handleOnChange(e);
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
                          handleSubmit();
                        }}
                        className="flex w-full justify-center rounded-md border border-transparent bg-primary py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                      >
                        Reset Password
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

export default ResetPassword;
