import { Routes } from "./routes";
import { getCookie } from "./utils/utility";

const App = () => {
  const token = getCookie("token");
  const isTokenExit = token ? true : false;
  console.log("isTokenExit", token);
  return <Routes isAuthorized={isTokenExit} />;
};

export default App;
