import { Outlet } from "react-router-dom";
import Navbar from "../navbar/Navbar";
import "./Layout.scss";

const Layout = () => {
  return (
    <>
      <header>
        <Navbar />
      </header>

      <main className="layout-outlet">
        <Outlet />
      </main>

      <footer className="layout-footer">
        © {new Date().getFullYear()} Anatoly Grankov
      </footer>
    </>
  );
};

export default Layout;
