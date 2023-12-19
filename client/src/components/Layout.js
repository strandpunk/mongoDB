import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import "./Layout.css";

const Layout = () => {
  return (
    <>
      <header>
        <Navbar />
      </header>

      <main className="layout-container">
        <Outlet />
      </main>

      <footer className="layout-footer">
        © {new Date().getFullYear()} Anatoly Grankov
      </footer>
    </>
  );
};

export default Layout;
