import { Fragment } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export const notify = (action, message, position = "top-right") => {
  if (action === "success") {
    toast.success(
      <Fragment>
        <div className="toastify-header">
          <div className="title-wrapper">
            <h6 className="toast-title text-success">Success!</h6>
          </div>
          <small className="text-muted">
            {new Date().toLocaleTimeString()}
          </small>
        </div>
        <div className="toastify-body font-weight-bold">
          <span role="img" aria-label="toast-text">
            {message}
          </span>
        </div>
      </Fragment>,
      { position, hideProgressBar: false },
    );
  } else if (action === "error") {
    toast.error(
      <Fragment>
        <div className="toastify-header">
          <div className="title-wrapper">
            <h6 className="toast-title text-danger">Error!</h6>
          </div>
          <small className="text-muted">
            {new Date().toLocaleTimeString()}
          </small>
        </div>
        <div className="toastify-body font-weight-bold">
          <span role="img" aria-label="toast-text">
            {message}
          </span>
        </div>
      </Fragment>,
      { position, hideProgressBar: false },
    );
  } else if (action === "errors") {
    toast.error(
      <Fragment>
        <div className="toastify-header">
          <div className="title-wrapper">
            <h6 className="toast-title text-danger">Error!</h6>
          </div>
          <small className="text-muted">
            {new Date().toLocaleTimeString()}
          </small>
        </div>
        <div className="toastify-body">
          <ol className="p-0">
            {message.map((m, index) => (
              <li key={index + 1} className="font-weight-bold">
                {m}
              </li>
            ))}
          </ol>
        </div>
      </Fragment>,
      { position, hideProgressBar: false },
    );
  } else if (action === "warning") {
    toast.warning(
      <Fragment>
        <div className="toastify-header">
          <div className="title-wrapper">
            <h6 className="toast-title text-warning">Warning!</h6>
          </div>
          <small className="text-muted">
            {new Date().toLocaleTimeString()}
          </small>
        </div>
        <div className="toastify-body font-weight-bold">
          <span role="img" aria-label="toast-text">
            {message}
          </span>
        </div>
      </Fragment>,
      { position, hideProgressBar: false },
    );
  } else if (action === "info") {
    toast.info(
      <Fragment>
        <div className="toastify-header">
          <div className="title-wrapper">
            <h6 className="toast-title text-info">Info!</h6>
          </div>
          <small className="text-muted">
            {new Date().toLocaleTimeString()}
          </small>
        </div>
        <div className="toastify-body font-weight-bold">
          <span role="img" aria-label="toast-text">
            {message}
          </span>
        </div>
      </Fragment>,
      { position, hideProgressBar: false },
    );
  } else {
    toast(
      <Fragment>
        <div className="toastify-header">
          <div className="title-wrapper">
            <h6 className="toast-title text-primary">Default!</h6>
          </div>
          <small className="text-muted">
            {new Date().toLocaleTimeString()}
          </small>
        </div>
        <div className="toastify-body font-weight-bold">
          <span role="img" aria-label="toast-text">
            {message}
          </span>
        </div>
      </Fragment>,
      { position, hideProgressBar: false },
    );
  }
};
