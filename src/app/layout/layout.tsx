import { Outlet } from "react-router-dom";
import { Sidebar } from "../components";

const Layout = () => {

  return (
    <>
      <div className="flex gap-x-10">
          <div className="w-60 flex-shrink-0">
            <Sidebar />
          </div>
          <div className="flex-grow">
            <Outlet />
          </div>
      </div>
    </>
  );
};

export default Layout;
