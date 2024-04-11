import { useNavigate } from "react-router";
import { useContext, useState } from "react";
import AuthContext from "../../context/AuthContext";
import axios from "axios";
import "./Sign.scss";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { getLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const login = async (e) => {
    e.preventDefault();

    try {
      const loginData = { email, password };
      await axios.post("http://localhost:5000/auth/login", loginData);
      await getLoggedIn();
      navigate("/");
    } catch (error) {
      const errorMessage = error.response?.data?.errorMessage;
      console.log(errorMessage)
      alert('Пользователь с такими данными не найден');
    }
  };

  const emailHandler = (e) => {
    setEmail(e.target.value);
    const re = /^(([^<>()\]\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!re.test(String(e.target.value).toLowerCase())) {
      setEmailError("Некорректная почта");
    } else {
      setEmailError("");
    }
  };

  const passwordHandler = (e) => {
    setPassword(e.target.value);
    setPasswordError(e.target.value.trim() === "" ? "Недопустимый пароль" : "");
    
  };

  return (
    <div className="form__container form__container--signIn">
      <form onSubmit={login} className="form">
        <h3>Вход</h3>
        <label className="form__label">Почта</label>
        <input
          onChange={(e) => emailHandler(e)}
          value={email}
          name="email"
          type="text"
          className="form__input"
          placeholder="Введите почту"
        />
        <div className="form__error">{emailError}</div>

        <label className="form__label">Пароль</label>
        <input
          onChange={(e) => passwordHandler(e)}
          value={password}
          name="password"
          type="password"
          className="form__input"
          placeholder="Введите пароль"
        />
        <div className="form__error">{passwordError}</div>

        <button type="submit" className="form__button">
          ВОЙТИ
        </button>
      </form>
    </div>
  );
};

export default SignIn;
