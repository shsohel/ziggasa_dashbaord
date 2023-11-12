/** @format */

import Layouts from "@/components/layout";
import UserAccount from "@/components/views/user-account";

import { useRouter } from "next/router";
import React from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getAuthUser, getCustomerOrders } from "store/auth/actions";

const MyAccount = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const backToLogin = () => {
    router.push("/auth/login");
  };

  // useEffect(() => {
  //   dispatch(getAuthUser(backToLogin));
  // }, []);

  // useEffect(() => {
  //   dispatch(getCustomerOrders());
  // }, []);

  return (
    <Layouts title="My Account" isFromAnother={true}>
      <UserAccount />
    </Layouts>
  );
};

export default MyAccount;
