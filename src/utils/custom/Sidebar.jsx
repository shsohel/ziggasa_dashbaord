import { Fragment, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { RxCross1 } from 'react-icons/rx';
// import { XMarkIcon } from '@heroicons/react/24/outline';

const Sidebar = (props) => {
  const {
    children,
    FooterComponent,
    handleSidebarModal,
    title,
    isOpen = false,
  } = props;

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-50 dark:text-white"
        onClose={handleSidebarModal}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-in-out duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in-out duration-500"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <Transition.Child
                entered="left"
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                  <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl dark:bg-secondary">
                    <div className="flex-1 overflow-y-auto py-6 px-4 sm:px-6">
                      <div className=" border-b pb-1">
                        <div className="flex items-center justify-between">
                          <Dialog.Title className=" text-lg font-medium dark:text-white">
                            {title}
                          </Dialog.Title>
                          <div className="ml-3 flex h-7 items-center">
                            <button
                              type="button"
                              className="-m-2 p-2 text-gray-400 hover:text-gray-500 focus:outline-none"
                              onClick={() => handleSidebarModal(false)}
                            >
                              <span className="sr-only">Close panel</span>
                              <RxCross1
                                className="h-5 w-5"
                                aria-hidden="true"
                              />
                            </button>
                          </div>
                        </div>
                      </div>

                      <div className="py-3">{children}</div>
                    </div>

                    {FooterComponent}
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};
export default Sidebar;
