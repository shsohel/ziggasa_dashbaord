import AppLayout from "../layouts";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <AppLayout>
      <Outlet />
    </AppLayout>
  );
};

export default MainLayout;
