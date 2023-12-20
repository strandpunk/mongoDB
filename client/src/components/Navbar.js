import { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import SignOut from "./SignOut";
import "./Navbar.css";
import FindUsers from "./FindUsers";
import Sub from "./Sub";

const Navbar = () => {
  const { loggedIn } = useContext(AuthContext);

  return (
    <header className="navbar-header">
      <Link to={"/"}>
        <img id="Logo" src="/home.svg" alt="Logo" className="cursor-pointer" />
      </Link>
      <nav>
        {loggedIn === false && (
          <>
            <div className="navbar-linkWrapper">
              <NavLink
                className="navbar-navlink"
                to="/signin"
                element={<SignIn />}
              >
                Войти
              </NavLink>
              <NavLink
                className="navbar-navlink"
                to="/signup"
                element={<SignUp />}
              >
                Зарегистрироваться
              </NavLink>
            </div>
          </>
        )}
        {loggedIn === true && (
          <>
            <div className="navbar-linkWrapper">
              <div className="navbar-loggedIn">
                <div>Вы вошли,</div>
                <div>Ваш Близкий!</div>
              </div>
              <FindUsers />
              <Sub />
              <SignOut />
            </div>
          </>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
