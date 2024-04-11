import { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import SignIn from "../authentication/SignIn";
import SignUp from "../authentication/SignUp";
import SignOut from "../authentication/SignOut";
import "./Navbar.scss";
import FindUsers from "../findUsers/FindUsers";
import Sub from "../subscription/Sub";

const Navbar = () => {
  const { loggedIn } = useContext(AuthContext);

  return (
    <header className="navbar-header">
      <div>
        {loggedIn === false && (
          <>
            <Link to={"/"}>
              <img
                id="Logo"
                src="/home.svg"
                alt="Logo"
                className="cursor-pointer"
              />
            </Link>
          </>
        )}
        {loggedIn === true && (
          <>
            <Link to={"/"}>
              <img
                id="Logo"
                src="/home.svg"
                alt="Logo"
                className="cursor-pointer"
              />
            </Link>
            <Link to={"/chats"}>
              <img
                id="Chat"
                src="/chat.svg"
                alt="Chat"
                className="cursor-pointer"
              />
            </Link>
            <Link to={"/friends"}>
              <img
                id="Friends"
                src="/friends.svg"
                alt="Friends"
                className="cursor-pointer"
              />
            </Link>
          </>
        )}
      </div>

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
