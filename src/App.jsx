/** @format */

import { useSelector } from "react-redux";
import { Routes } from "./routes";

const App = () => {
  const { token, tokenExpires } = useSelector(({ auth }) => auth);
  console.log("tokenExpires", Date.now(), Date.parse(tokenExpires));
  const isTokenExpired = Date.now() >= Date.parse(tokenExpires);

  console.log(isTokenExpired);
  return <Routes isAuthorized={!isTokenExpired} />;
};

export default App;
