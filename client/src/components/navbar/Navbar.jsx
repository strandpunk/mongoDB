import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import SignIn from "../authentication/SignIn";
import SignUp from "../authentication/SignUp";
import axios from "axios";
import "./Navbar.scss";

const Navbar = () => {
  const { loggedIn } = useContext(AuthContext);

  const { getLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();

  async function endSession() {
    await axios.get("http://localhost:5000/auth/logout");
    await getLoggedIn();
    navigate("/signin");
  }

  async function extendSub() {
    await axios.get("http://localhost:5000/auth/extendSub");
    alert("подписка продлена");
  }

  return (
    <div className="navbar__containter">
      <header className="navbar-header">
        <div>
          {/* {loggedIn === false && (
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
        )} */}
             {loggedIn === true && (
              <>
                <div className="navbar__tools">
                  <Link to={"/"}>
                    <div className="navbar__img">
                      <img
                        id="Logo"
                        src="/user.svg"
                        alt="Logo"
                        className="cursor-pointer"
                      /></div>
                  </Link>
                  <Link to={"/chats"}>
                    <div className="navbar__img">
                      <img
                        id="Chat"
                        src="/chat4.svg"
                        alt="Chat"
                        className="cursor-pointer"
                      /></div>
                  </Link>
                  <Link to={"/friends"}>
                    <div className="navbar__img">
                      <img
                        id="Friends"
                        src="/friends3.svg"
                        alt="Friends"
                        className="cursor-pointer"
                      /></div>
                  </Link>
                  <Link to={"/users"}>
                    <div className="navbar__img">
                      <img
                        id="FindUsers"
                        src="/find.svg"
                        alt="FindUsers"
                        className="cursor-pointer"
                      /></div>
                  </Link>
                  <Link onClick={(e) => extendSub()}>
                    <div className="navbar__img">
                    <img
                        id="Subscribe"
                        src="/sub.svg"
                        alt="Subscribe"
                        className="cursor-pointer"
                      /></div>
                  </Link>
                </div>
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
                <div className="navbar-navlink"
                  onClick={(e) => endSession()}
                >
                  Выйти
                </div>
              </div>
            </>
          )}
        </nav>
      </header>
    </div>
  );
};

export default Navbar;
