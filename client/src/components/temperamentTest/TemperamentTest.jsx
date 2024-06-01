import React, { useState, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import AuthContext from "../../context/AuthContext";
import "./TemperamentTest.scss";

const TemperamentTest = () => {
  const [answers, setAnswers] = useState({});
  const [error, setError] = useState("");
  const [extrovertScores, setExtrovertScores] = useState({});
  const [neuroticismScores, setNeuroticismScores] = useState({});
  const [lieScale, setLieScale] = useState(0); // Шкала искренности

  const navigate = useNavigate();
  const location = useLocation();
  const userData = location.state;
  const { getLoggedIn } = useContext(AuthContext);

  const handleOptionSelect = (questionId, optionIndex) => {
    const updatedAnswers = { ...answers, [questionId]: optionIndex };
    setAnswers(updatedAnswers);

    // Обработка ответов для шкалы искренности
    if ([6, 24, 36].includes(questionId)) {
      setExtrovertScores(prevScores => ({ ...prevScores, [questionId]: optionIndex === 0 ? 1 : 0 }));
    } else if ([12, 18, 30, 42, 48, 54].includes(questionId)) {
      setExtrovertScores(prevScores => ({ ...prevScores, [questionId]: optionIndex === 1 ? 1 : 0 }));
    }

    if ([1, 3, 8, 10, 13, 17, 22, 27, 39, 46, 49, 53, 56].includes(questionId)) {
      setExtrovertScores(prevScores => ({ ...prevScores, [questionId]: optionIndex === 0 ? 1 : 0 }));
    }

    if ([2, 4, 7, 9, 11, 14, 16, 19, 21, 23, 26, 28, 31, 33, 35, 38, 40, 43, 45, 47, 50, 52, 55, 57].includes(questionId)) {
      setNeuroticismScores(prevScores => ({ ...prevScores, [questionId]: optionIndex === 0 ? 1 : 0 }));
    }

    // Обработка ответов для шкалы искренности
    if ([6, 12, 18, 24, 30, 36, 42, 48, 54].includes(questionId)) {
      setLieScale(prevScale => prevScale + (optionIndex === 0 ? 1 : 0));
    }
  };


  const calculateResult = () => {
    if (Object.keys(answers).length < 57) {
      setError("Пожалуйста, ответьте на все вопросы перед получением результата");
      return;
    }

    const extrovertScore = Object.values(extrovertScores).reduce((acc, curr) => acc + curr, 0);
    const neuroticismScore = Object.values(neuroticismScores).reduce((acc, curr) => acc + curr, 0);

    const extrovertResult = extrovertScore > 12 ? "extrovert" : "introvert";
    const neuroticismResult = neuroticismScore > 12 ? "neurotic" : "stable";

    let temperament = '';

    if (extrovertResult === "extrovert" && neuroticismResult === "stable") {
      temperament = "sanguine";
    } else if (extrovertResult === "extrovert" && neuroticismResult === "neurotic") {
      temperament = "choleric";
    } else if (extrovertResult === "introvert" && neuroticismResult === "stable") {
      temperament = "melancholic";
    } else if (extrovertResult === "introvert" && neuroticismResult === "neurotic") {
      temperament = "phlegmatic";
    }

    if (lieScale > 7) {
      userData.lie = true;
    } else { userData.lie = false }

    userData.temperament = temperament;

    //console.log(temperament)
    console.log(userData);

    register(userData);
  };

  const register = async (data) => {
    try {
      const response = await axios.post("http://localhost:5000/auth/", data);
      console.log(response.data); // Вывод ответа сервера для отладки
      navigate("/");
      getLoggedIn(); // Нужно ли это?
    } catch (error) {
      console.error("Ошибка при отправке запроса:", error);
      setError("Произошла ошибка при отправке запроса");
    }
  };

  const questions = [
    { id: 1, text: "Часто ли вы испытываете тягу к новым впечатлениям, что-бы отвлечься, испытать сильные ощущения?", options: ["Да", "Нет"] },
    { id: 2, text: "Часто ли вы чувствуете, что нуждаетесь в друзьях, которые могут вас понять, ободрить, выразить сочувствие?", options: ["Да", "Нет"] },
    { id: 3, text: "Считаете ли вы себя беспечным человеком?", options: ["Да", "Нет"] },
    { id: 4, text: "Очень ли трудно вам отказаться от своих намерений?", options: ["Да", "Нет"] },
    { id: 5, text: "Обдумываете ли вы свои дела не спеша и предпочитаете ли подождать перед тем, как действовать?", options: ["Да", "Нет"] },
    { id: 6, text: "Всегда ли сдерживаете свои обещания, даже если вам это невыгодно?", options: ["Да", "Нет"] },
    { id: 7, text: "Часто ли у вас бывают спады и подъемы настроения?", options: ["Да", "Нет"] },
    { id: 8, text: "Быстро ли вы обычно действуете и говорите, и не растрачиваете ли много времени на обдумывание?", options: ["Да", "Нет"] },
    { id: 9, text: "Возникает ли у вас чувство, что вы несчастны, хотя никакой серьезной причины для этого нет?", options: ["Да", "Нет"] },
    { id: 10, text: "Верно ли, что на спор вы способны решиться на почти все?", options: ["Да", "Нет"] },
    { id: 11, text: "Смущаетесь ли вы, когда хотите познакомиться с человеком противоположного пола, который вам симпатичен?", options: ["Да", "Нет"] },
    { id: 12, text: "Бывает ли, что вам не хватает духу справиться с трудностями?", options: ["Да", "Нет"] },
    { id: 13, text: "Часто ли вы действуете под влиянием момента?", options: ["Да", "Нет"] },
    { id: 14, text: "Часто ли вы переживаете из-за того, что сделали или сказали что-то такое, чего не следовало бы делать или говорить?", options: ["Да", "Нет"] },
    { id: 15, text: "Предпочитаете ли вы чтение книг встречам с людьми?", options: ["Да", "Нет"] },
    { id: 16, text: "Верно ли, что вы легко можете обидеться?", options: ["Да", "Нет"] },
    { id: 17, text: "Любите ли вы часто бывать в компании?", options: ["Да", "Нет"] },
    { id: 18, text: "Бывает ли, что у вас сердцебиение?", options: ["Да", "Нет"] },
    { id: 19, text: "Нравится ли вам работа, которая требует быстроты действий?", options: ["Да", "Нет"] },
    { id: 20, text: "Стараетесь ли вы ограничить круг знакомств небольшим числом близких людей?", options: ["Да", "Нет"] },
    { id: 21, text: "Часто ли у вас бывают приступы дрожи?", options: ["Да", "Нет"] },
    { id: 22, text: "Когда на вас кричат, отвечаете ли вы тем же?", options: ["Да", "Нет"] },
    { id: 23, text: "Часто ли вас беспокоит чувство вины?", options: ["Да", "Нет"] },
    { id: 24, text: "Все ли ваши привычки хороши и желательны?", options: ["Да", "Нет"] },
    { id: 25, text: "Способны ли вы иногда дать волю своим чувствам и беззаботно развлечься с веселой компанией?", options: ["Да", "Нет"] },
    { id: 26, text: "Можно ли сказать, что нервы у вас часто бывают натянуты до предела?", options: ["Да", "Нет"] },
    { id: 27, text: "Слывете ли вы за человека живого и веселого?", options: ["Да", "Нет"] },
    { id: 28, text: "После того как дело сделано, часто ли вы мысленно возвращаетесь к нему и думаете, что могли бы сделать лучше?", options: ["Да", "Нет"] },
    { id: 29, text: "Чувствуете ли вы себя неспокойно, находясь в большой компании?", options: ["Да", "Нет"] },
    { id: 30, text: "Бывает ли, что вы передаете слухи?", options: ["Да", "Нет"] },
    { id: 31, text: "Бывает ли, что вам не спится из-за того, что в голову лезут разные мысли?", options: ["Да", "Нет"] },
    { id: 32, text: "Верно ли, что вам часто приятнее и легче прочесть о том, что вас интересует в книге, хотя можно быстрее спросить и проще узнать об этом у друзей?", options: ["Да", "Нет"] },
    { id: 33, text: "Бывают ли у вас сильные сердцебиения?", options: ["Да", "Нет"] },
    { id: 34, text: "Нравится ли вам работа, требующая сосредоточения?", options: ["Да", "Нет"] },
    { id: 35, text: "Бывают ли у вас приступы дрожи?", options: ["Да", "Нет"] },
    { id: 36, text: "Всегда ли вы говорите только правду?", options: ["Да", "Нет"] },
    { id: 37, text: "Бывает ли вам неприятно находиться в компании, где все подшучивают друг над другом?", options: ["Да", "Нет"] },
    { id: 38, text: "Раздражительны ли вы?", options: ["Да", "Нет"] },
    { id: 39, text: "Нравится ли вам работа, требующая быстрого действия?", options: ["Да", "Нет"] },
    { id: 40, text: "Верно ли, что вам часто не дают покоя мысли о разных неприятностях и 'ужасах', которые могли бы произойти, хотя все кончилось благополучно?", options: ["Да", "Нет"] },
    { id: 41, text: "Верно ли, что вы неторопливы в движениях и несколько медлительны?", options: ["Да", "Нет"] },
    { id: 42, text: "Опаздывали ли вы когда-нибудь на работу или на встречу с кем-либо?", options: ["Да", "Нет"] },
    { id: 43, text: "Часто ли вам снятся кошмары?", options: ["Да", "Нет"] },
    { id: 44, text: "Верно   ли, что вы так любите поговорить, что не упускаете любого удобного случая побеседовать с новым человеком?", options: ["Да", "Нет"] },
    { id: 45, text: "Беспокоят ли вас какие-нибудь боли?", options: ["Да", "Нет"] },
    { id: 46, text: "Огорчились бы вы, если бы долго не могли видеться со своими друзьями?", options: ["Да", "Нет"] },
    { id: 47, text: "Можете ли вы назвать себя нервным человеком?", options: ["Да", "Нет"] },
    { id: 48, text: "Есть ли среди ваших знакомых такие, которые вам явно не нравятся?", options: ["Да", "Нет"] },
    { id: 49, text: "Могли бы вы сказать, что вы уверенный в себе человек?", options: ["Да", "Нет"] },
    { id: 50, text: "Легко ли вас задевает критика ваших недостатков или вашей работы?", options: ["Да", "Нет"] },
    { id: 51, text: "Трудно ли вам получить настоящее удовольствие от мероприятий, в которых участвует много народа?", options: ["Да", "Нет"] },
    { id: 52, text: "Беспокоит ли вас чувство, что вы чем-то хуже других?", options: ["Да", "Нет"] },
    { id: 53, text: "Сумели бы вы внести оживление в скучную компанию?", options: ["Да", "Нет"] },
    { id: 54, text: "Бывает ли, что вы говорите о вещах, в которых совсем не разбираетесь?", options: ["Да", "Нет"] },
    { id: 55, text: "Беспокоитесь ли вы о своем здоровье?", options: ["Да", "Нет"] },
    { id: 56, text: "Любите ли вы подшутить над другими?", options: ["Да", "Нет"] },
    { id: 57, text: "Страдаете ли вы бессонницей?", options: ["Да", "Нет"] }
  ];

  return (
    <div className="form_placer">
      <div className="temperament-test">
        <h2>Тест на определение типа темперамента</h2>
        <div className="questions">
          {questions.map((question) => (
            <div key={question.id} className="question">
              <h3>{question.text}</h3>
              {question.options.map((option, index) => (
                <label key={index}>
                  <input
                    type="radio"
                    name={`question${question.id}`}
                    value={index}
                    checked={answers[question.id] === index}
                    onChange={() => handleOptionSelect(question.id, index)}
                  />
                  {option}
                </label>
              ))}
            </div>
          ))}
        </div>
        {error && <div className="error">{error}</div>}
        <button className="form__button" onClick={calculateResult}>Получить результат</button>
      </div>
    </div>
  );
}

export default TemperamentTest;
