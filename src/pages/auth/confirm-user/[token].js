import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import Logo from '../../../components/custom/Logo';
import { confirmedUser, forgotPassword } from '../../../store/auth/actions';
import ProgressLoader from 'components/custom/loader/ProgressLoader';
import Layout from 'components/Layout';
import { useRouter } from 'next/router';

const ConfirmedUser = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [isProgressLogin, setIsProgressLogin] = useState(false);
  const { token } = router.query;

  const responseBack = (isSuccess) => {
    if (isSuccess) {
      router.push('/auth/login');
    } else {
      setIsProgressLogin(false);
    }
  };
  const [email, setEmail] = useState('');

  const handleForgotPassword = () => {
    setIsProgressLogin(true);
    dispatch(confirmedUser(token, responseBack));
  };
  return (
    <Layout title="Forgot Password">
      <ProgressLoader isProgress={isProgressLogin}>
        <div className="container">
          <div className="my-[4.5rem] lg:mt-[9rem]">
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
    </Layout>
  );
};

export default ConfirmedUser;
