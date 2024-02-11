import { Fragment, useRef } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { RxCross1 } from "react-icons/rx";

const Modal = (props) => {
  const {
    children,
    isOpen = false,
    openModal,
    FooterComponent,
    title,
    size = "sm",
    onClose,
  } = props;

  const cancelButtonRef = useRef(null);

  const getWidth = () => {
    let widthStyle = "";
    if (size === "sm") {
      widthStyle = "max-w-xl";
    } else if (size === "md") {
      widthStyle = "max-w-2xl";
    } else if (size === "lg") {
      widthStyle = "max-w-4xl";
    } else {
      widthStyle = "max-w-full";
    }
    return widthStyle;
  };

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        initialFocus={cancelButtonRef}
        onClose={(e) => {
          console.log(e);
          onClose();
        }}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0  bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed top-28 right-0 left-0 z-10 overflow-y-auto md:top-44">
          <div className="flex min-h-full  justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel
                className={`mx-4 block w-full transform  text-left text-base transition md:my-1  md:px-4 ${getWidth()} `}
              >
                <div className=" w-full overflow-hidden  bg-white text-dark px-4 pt-4 pb-4 shadow-2xl ">
                  <div className="flex  w-full place-items-center justify-between  border-b">
                    <Dialog.Title className="py-2 text-sm font-medium text-gray-700">
                      {title}
                    </Dialog.Title>
                    <RxCross1
                      onClick={() => openModal(false)}
                      className="cursor-pointer text-gray-600 hover:text-gray-400"
                      size={16}
                      aria-hidden="true"
                    />
                  </div>
                  <div className="max-h-[28rem] min-h-[9rem] custom-scrollbar overflow-y-auto py-2 md:overflow-y-hidden">
                    {children}
                  </div>
                  <div className="border-t py-2">{FooterComponent}</div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default Modal;
