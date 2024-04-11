import { useContext, useEffect, useState } from "react";
// import { useNavigate } from 'react-router-dom'
import AuthContext from "../../context/AuthContext";
import "./Home.scss";
import Data from "../data/Data";
import User from "../user/User";
import axios from "axios";

const Home = () => {
  const { loggedIn } = useContext(AuthContext);
  // const navigate = useNavigate()
  const [user, setUser] = useState({});

  async function getUser() {
    try {
      const userList = await axios.get("https://localhost:5000/auth/info");
      setUser(userList.data);
    } catch (error) {
      console.error("Ошибка при получении данных пользователя:", error);
    }
  }

  useEffect(() => {
    getUser();
  }, []);

  return (
    // content-wrapper?
    <main>
      {loggedIn === true && (
        <>
          <div className="home-wrapper">
            <div className="home-main">
              <div className="user-info">
                {" "}
                <User user={user} getUser={getUser} />
              </div>
              <section>
                <Data />
              </section>
            </div>
          </div>
        </>
      )}

      {loggedIn === false && (
        <>
          <div className="home-unauthorized">
            <h1>Зарегистрируйтесь или войдите</h1>
          </div>
        </>
      )}
    </main>
  );
};

export default Home;
