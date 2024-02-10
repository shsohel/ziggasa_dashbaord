import { FaAddressBook, FaQuestionCircle } from 'react-icons/fa';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

export const confirmDialog = (confirmObj) => {
  const { title, text, confirmButtonText, cancelButtonText } = confirmObj;
  const iconSvg = `<svg class="h-10 w-10 text-red-600" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
    <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"></path>
</svg>`;
  return MySwal.fire({
    showCancelButton: true,
    buttonsStyling: false,
    icon: 'question',
    iconHtml: <FaQuestionCircle />,
    title,
    // text,
    html: text,
    confirmButtonText,
    cancelButtonText,
    // customClass: {
    //   confirmButton: 'btn btn-primary',
    //   cancelButton: 'btn btn-danger ms-1',
    // },
    customClass: {
      popup:
        '!relative !transform !overflow-hidden !rounded-lg !bg-white !text-left !shadow-xl !transition-all sm:!my-8 !max-w-sm !p-0 !grid-cols-none',
      icon: '!m-0 !mx-auto !flex !h-12 !w-12 !flex-shrink-0 !items-center !justify-center !rounded-full !border-0 !bg-red-100 sm:!h-10 sm:!w-10 !mt-5 sm!mt-6 sm:!ml-6 !col-start-1 !col-end-3 sm:!col-end-2',
      title:
        '!p-0 !pt-3 !text-center sm:!text-left !text-base !font-semibold !leading-6 !text-gray-900 !pl-4 !pr-4 sm:!pr-6 sm:!pl-0 sm:!pt-6 sm:!ml-4 !col-start-1 sm:!col-start-2 !col-end-3',
      htmlContainer:
        '!mt-2 sm:!mt-0 !m-0 !text-center sm:!text-left !text-sm !text-gray-500 !pl-4 sm:!pl-0 !pr-4 !pb-4 sm:!pr-6 sm:!pb-4 sm:!ml-4 !col-start-1 sm:!col-start-2 !col-end-3',
      actions:
        '!bg-gray-50 !px-4 !py-3 sm:!flex sm:!flex-row-reverse sm:!px-6 !w-full !justify-start !mt-0 !col-start-1 !col-end-3',
      confirmButton:
        'inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto',
      cancelButton:
        'mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto',
    },
  });
};

export const confirmOK = (confirmObj) => {
  const { title, text, confirmButtonText, cancelButtonText } = confirmObj;

  return MySwal.fire({
    title,
    html: text,
    allowOutsideClick: false,
    icon: 'error',

    showCancelButton: false,
    confirmButtonText,
    cancelButtonText,
    customClass: {
      confirmButton: 'btn btn-primary',
      cancelButton: 'btn btn-danger ms-1',
    },
    buttonsStyling: false,
  });
};
