import AuthContext from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import React, { useContext } from "react";
import axios from "axios";

function SignOutBtn() {
  const { getLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();

  async function signOut() {
    await axios.get("http://localhost:5000/auth/logout");
    await getLoggedIn();
    navigate("/signin");
  }

  return (
    <button className="custom__btn-signOut" onClick={signOut}>
      Выйти
    </button>
  );
}

export default SignOutBtn;
