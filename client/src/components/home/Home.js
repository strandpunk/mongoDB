import { useContext, useState } from "react";
// import { useNavigate } from 'react-router-dom'
import AuthContext from "../../context/AuthContext";
import "./Home.css";
import Data from "../data/Data";
import User from "../user/User";

const Home = () => {
  const { loggedIn } = useContext(AuthContext);
  const [samuraiInfo, setSamuraiInfo] = useState(false)
  // const navigate = useNavigate()

  function samurai() {
    setSamuraiInfo(true)
  }


  return (
    // content-wrapper?
    <main>
      {loggedIn === true && (
        <>

          <div className="home-wrapper">
            <div className="home-main">
              <div className="user-info">
                <User samuraiInfo={samuraiInfo} setSamuraiInfo={setSamuraiInfo} />
              </div>
              <section>
                <Data samurai={samurai} />
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
