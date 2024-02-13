/** @format */

import { useSelector } from "react-redux";
import { Routes } from "./routes";
import { getCookie } from "./utils/utility";

const App = () => {
  const { token } = useSelector(({ auth }) => auth);

  return <Routes isAuthorized={token} />;
};

export default App;
