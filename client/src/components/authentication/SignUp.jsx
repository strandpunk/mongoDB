import { useState } from "react";
import { useNavigate } from "react-router";
import moment from 'moment'
import "./Sign.scss";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVerify, setPasswordVerify] = useState("");
  const temperament = 'none'

  const [city, setCity] = useState("Москва");
  const [gender, setGender] = useState("");
  const [age, setAge] = useState("");
  const [checked, setChecked] = useState(false);

  const navigate = useNavigate();

  const cities = [
    "Москва",
    "Санкт-Петербург",
    "Новосибирск",
    "Екатеринбург",
    "Нижний Новгород",
    "Казань",
    "Челябинск",
    "Омск",
    "Самара",
    "Ростов-на-Дону"
  ];

  function register(e) {
    e.preventDefault();


    const registerData = {
      name,
      email,
      password,
      passwordVerify,
      city,
      gender,
      age,
      temperament,
    };
console.log(registerData)
    navigate("/hobby", { state: registerData });
  }

  // VALIDATION

  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState(
    ""
  );
  const [passwordError, setPasswordError] = useState(
    ""
  );
  const [passwordVerifyError, setPasswordVerifyError] = useState(
    ""
  );

  const [ageError, setAgeError] = useState("");
  const [myCheckboxError, setMyCheckboxError] = useState("");
  const [myRadioError, setMyRadioError] = useState("");

  const nameHandler = (e) => {
    setName(e.target.value);
    if (!e.target.value) {
      setNameError("Это поле не может быть пустым");
    } else {
      setNameError("");
    }
  };

  const emailHandler = (e) => {
    setEmail(e.target.value);
    const re =
      /^(([^<>()\]\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!re.test(String(e.target.value).toLowerCase())) {
      setEmailError("Некорректная почта");
      if (!e.target.value) {
        setEmailError("Поле почты не может быть пустым");
      }
    } else {
      setEmailError("");
    }
  };

  const passwordHandler = (e) => {
    setPassword(e.target.value);

    const uppercaseRegExp = /(?=.*?[A-Z])/;
    const lowercaseRegExp = /(?=.*?[a-z])/;
    const digitsRegExp = /(?=.*?[0-9])/;
    const specialCharRegExp = /(?=.*?[#?!@$%^&*-])/;
    const minLengthRegExp = /.{8,}/;

    const passwordLength = e.target.value.length;
    const uppercasePassword = uppercaseRegExp.test(e.target.value);
    const lowercasePassword = lowercaseRegExp.test(e.target.value);
    const digitsPassword = digitsRegExp.test(e.target.value);
    const specialCharPassword = specialCharRegExp.test(e.target.value);
    const minLengthPassword = minLengthRegExp.test(e.target.value);

    switch (true) {
      case passwordLength === 0:
        setPasswordError("Поле пароля не может быть пустым");
        break;
      case !uppercasePassword:
        setPasswordError("Введите символ с верхним регистром");
        break;
      case !lowercasePassword:
        setPasswordError("Введите символ с нижним регистром");
        break;
      case !digitsPassword:
        setPasswordError("Введите цифру");
        break;
      case !specialCharPassword:
        setPasswordError("Введите специальный символ");
        break;
      case !minLengthPassword:
        setPasswordError("Минимальная длина пароля - 8 символов");
        break;
      default:
        setPasswordError("");
        break;
    }
  };

  const confirmPasswordHandler = (e) => {
    setPasswordVerify(e.target.value);

    if (e.target.value.length === 0) {
      setPasswordVerifyError("Это поле не может быть пустым");
    } else setPasswordVerifyError("");
  };

  const ageHandler = (e) => {
    const selectedDate = e.target.value; // Получаем введенную дату из инпута
    console.log(selectedDate)
    const minAdultAge = 18; // Минимальный возраст для совершеннолетия
    const maxAdultAge = 100; // Максимальный возраст для регистрации
  
    // Проверяем совершеннолетие на основе введенной даты
    const age = moment().diff(selectedDate, 'years');

    if (!selectedDate || selectedDate === null) {
      setAgeError("Пожалуйста, введите дату рождения"); // Устанавливаем ошибку, если поле пустое
      return; // Прекращаем выполнение функции
    }
  
    if (age < minAdultAge || age > maxAdultAge) {
      setAgeError("Недопустимый возраст"); // Устанавливаем ошибку, если возраст меньше 18 лет
    } else {
      setAge(selectedDate); // Устанавливаем возраст
      setAgeError(""); // Сбрасываем ошибку
    }
  };

  const genderHandler = (e) => {
    setGender(e.target.value);
    if (!e.target.value) {
      setMyRadioError("Вы должны выбрать пол");
    } else {
      setMyRadioError("");
    }
  };

  const checkboxHandler = (e) => {
    if (checked === true) {
      setChecked(false);
      setMyCheckboxError("Вы должны принять это");
    } else {
      setChecked(true);
      setMyCheckboxError("");
    }
  };

  const cityHandler = (e) => {
    const selectedCity = e.target.value;
    setCity(selectedCity);
  };

  const Pass = (e) => {
    if (passwordVerify.length === 0) {
      setPasswordVerifyError("Это поле не может быть пустым");
    } else {
      setPasswordVerifyError("");
    }
  };

  const getCurrentAdultDate = () => {
    const today = moment(); // Текущая дата и время
    const minAdultAge = 18; // Минимальный возраст для совершеннолетия
  
    // Определяем дату рождения, учитывая минимальный возраст для совершеннолетия
    const birthDate = today.subtract(minAdultAge, 'years');
  
    // Проверяем, нужно ли корректировать дату рождения из-за месяца и дня
    if (birthDate.isAfter(today)) {
      birthDate.subtract(1, 'years'); // Если родился в этом году, вычитаем год
    }
  
    return birthDate.format('YYYY-MM-DD');
  };
  
  // Пример использования функции getCurrentDate для получения даты рождения совершеннолетнего

  return (
    <>
      <form onSubmit={register} className="form__container form__container--signUp">
        <h3>Регистрация</h3>

        <label className="form__label">Имя</label>
        <input
          onChange={(e) => nameHandler(e)}
          value={name}
          name="name"
          type="text"
          className="form__input"
          placeholder="Введите имя"
        />
        <div className="form__error">{nameError}</div>

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

        <label className="form__label">Город</label>
        <select
          onChange={cityHandler}
          value={city}
          className="form__select"
          style={{ width: "100%" }}
        >
          {cities.map((cityName) => (
            <option key={cityName} value={cityName}>
              {cityName}
            </option>
          ))}
        </select>
        <div></div>
        <div className="form__error">{}</div>
        <div>
          <label className="form__label">Дата рождения</label>
          <input
            type="date"
            id="birthdate"
            name="birthdate"
            className="form__input form__input--age"
            onChange={(e) => ageHandler(e)}
            max={getCurrentAdultDate()} // Устанавливаем максимальное значение в текущую дату
          />
        </div>        
        <div className="form__error">{ageError}</div>

        <label className="form__label">Пол</label>
        <div className="form__gender">
          <label className="form__radio-label">
            <input
              onChange={(e) => genderHandler(e)}
              type="radio"
              name="myRadio"
              value="male"
              className="form__radio"
            />
            Мужчина
          </label>

          <label className="form__radio-label">
            <input
              onChange={(e) => genderHandler(e)}
              type="radio"
              name="myRadio"
              value="female"
              className="form__radio"
            />
            Женщина
          </label>
        </div>
        <div className="form__error">{myRadioError}</div>
        <span className="form__checkbox-wrapper">
          <label className="form__label form__label--checkbox">

            Подтверждаю свое совершеннолетие и даю согласие на обработку персональных данных{" "}
            <input
              onChange={(e) => checkboxHandler(e)}
              type="checkbox"
              name="myCheckbox"
              className="form__checkbox"
            />

          </label>
        </span>
        <div className="form__error">{myCheckboxError}</div>

        <label className="form__label">Пароль</label>
        <input
          onChange={(e) => passwordHandler(e)}
          value={password}
          name="password"
          type="password"
          className="form__input"
          placeholder="Придумайте пароль"
        />
        <div className="form__error">{passwordError}</div>

        <label className="form__label">Подтверждение пароля</label>
        <input
          onChange={(e) => confirmPasswordHandler(e)}
          value={passwordVerify}
          name="confirmPassword"
          type="password"
          className="form__input"
          placeholder="Введите пароль повторно"
        />
        <div className="form__error">{passwordVerifyError}</div>

        <button
          onClick={(e) => Pass(e)}
          type="submit"
          className="form__button"
        >
          ЗАРЕГИСТРИРОВАТЬСЯ
        </button>
      </form>
    </>
  );
};

export default SignUp;
