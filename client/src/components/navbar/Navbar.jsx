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
                    <div className="navbar__navlink">
                      Профиль</div>
                  </Link>
                  <Link to={"/chats"}>
                    <div className="navbar__navlink">
                      Сообщения</div>
                  </Link>
                  <Link to={"/friends"}>
                  <div className="navbar__navlink">
                      Знакомые</div>
                  </Link>
                  <Link to={"/users"}>
                  <div className="navbar__navlink">
                      Пользователи</div>
                  </Link>
                  <Link onClick={(e) => extendSub()}>
                  <div className="navbar__navlink">
                      Подписка</div>
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
                  className="navbar__navlink"
                  to="/signin"
                  element={<SignIn />}
                >
                  Войти
                </NavLink>
                <NavLink
                  className="navbar__navlink"
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
                <div className="navbar__navlink"
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
