import { Menu, Transition } from "@headlessui/react";
import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";

import { Fragment } from "react";
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

import userAvatar from "../assets/images/agent-1.jpg";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../store/auth/actions";
import { uploadUrl } from "../services";
import { replaceImage } from "../utils/utility";

const UserDropdown = () => {
  const dispatch = useDispatch();
  const { authUser } = useSelector(({ auth }) => auth);

  const navigate = useNavigate();
  // const handleLogout = () => {

  // };

  const handleCallback = () => {
    navigate("/login");
  };
  const handleLogout = () => {
    dispatch(logout(handleCallback));
  };

  console.log(authUser);

  return (
    <div>
      <Menu as="div" className="relative  lg:mt-2 lg:px-3">
        <div>
          <Menu.Button className="group w-full rounded-md  md:border text-left text-sm font-medium text-gray-700 focus:outline-none focus:ring-0 lg:bg-white lg:px-3.5 lg:py-2 lg:hover:bg-gray-200  ">
            <span className="flex w-full items-center justify-between">
              <span className="flex min-w-0 items-center justify-between space-x-3">
                <img
                  className=" flex-shrink-0 rounded-full h-10 w-10 bg-gray-300 object-cover object-center"
                  src={`${uploadUrl}${authUser?.photoUrl}`}
                  alt=""
                  width={45}
                  height={45}
                  onError={replaceImage}
                />
                <span className="hidden min-w-0 flex-1 flex-col lg:flex">
                  <span className="truncate text-sm font-medium text-gray-900">
                    {authUser?.name.toUpperCase() ?? "Demo User"}
                  </span>
                  <span className="truncate text-sm text-gray-500">
                    {authUser?.role.toUpperCase() ?? "Demo Role"}
                  </span>
                </span>
              </span>
              <EllipsisVerticalIcon
                className="hidden h-5 w-5 text-gray-400 group-hover:text-gray-500 lg:block"
                aria-hidden="true"
              />
            </span>
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="fixed right-0 z-50 mx-3 mt-1  w-48 origin-top divide-y divide-gray-200  bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none lg:left-0 lg:w-60">
            <div className="py-1 ">
              <Menu.Item>
                {({ active }) => (
                  <a
                    href="#"
                    className={classNames(
                      active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                      "block px-4 py-2 text-sm",
                    )}
                  >
                    View profile
                  </a>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <a
                    href="#"
                    className={classNames(
                      active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                      "block px-4 py-2 text-sm",
                    )}
                  >
                    Settings
                  </a>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <a
                    href="#"
                    className={classNames(
                      active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                      "block px-4 py-2 text-sm",
                    )}
                  >
                    Notifications
                  </a>
                )}
              </Menu.Item>
            </div>

            <div className="py-1">
              <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={() => {
                      handleLogout();
                    }}
                    className={classNames(
                      active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                      "block w-full px-4 py-2 text-left text-sm",
                    )}
                  >
                    Logout
                  </button>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
};

export default UserDropdown;
