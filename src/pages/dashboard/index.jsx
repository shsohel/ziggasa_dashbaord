import { getCookie } from "../../utils/utolity";

const Dashboard = () => {
  console.log(getCookie("token"));
  return <div>Dashboard</div>;
};

export default Dashboard;
