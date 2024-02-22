/** @format */

import { useSelector } from "react-redux";
import { Routes } from "./routes";

const App = () => {
  const { token, tokenExpires } = useSelector(({ auth }) => auth);
  console.log("tokenExpires", Date.now(), Date.now(tokenExpires));
  return <Routes isAuthorized={token} />;
};

export default App;
