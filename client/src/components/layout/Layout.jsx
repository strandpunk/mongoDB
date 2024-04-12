import { Outlet } from "react-router-dom";
import Navbar from "../navbar/Navbar";
import "./Layout.scss";

const Layout = () => {
  return (
    <>
      <div className="layout__container">

          <header className="layout__header">
            <Navbar />
          </header>

        <main className="layout__outlet">
          <Outlet />
        </main>

        {/* <footer className="layout__footer">
          © {new Date().getFullYear()} Anatoly Grankov
        </footer> */}
      </div>
    </>
  );
};

export default Layout;
