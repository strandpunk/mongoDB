import React, { useState, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import AuthContext from "../../context/AuthContext";
import "./TemperamentTest.scss";

function TemperamentTest() {
  const navigate = useNavigate();
  const location = useLocation();
  const userData = location.state;
  const { getLoggedIn } = useContext(AuthContext);

  const questions = [
    {
      id: 1,
      text: "Часто ли вы испытываете тягу к новым впечатлениям, что-бы отвлечься, испытать сильные ощущения?",
      options: ["Да", "Нет"],
    },
    {
      id: 2,
      text: "Часто ли вы чувствуете, что нуждаетесь в друзьях, которые могут вас понять, ободрить, выразить сочувствие??",
      options: ["Да", "Нет"],
    },
    {
      id: 7,
      text: "Часто ли у вас бывают спады и подъемы настроения?",
      options: ["Да", "Нет"],
    },
    {
      id: 8,
      text: "Быстро ли вы обычно действуете и говорите, и не растрачиваете ли много времени на обдумывание?",
      options: ["Да", "Нет"],
    },
    {
      id: 11,
      text: "Смущаетесь ли вы, когда хотите познакомиться с человеком противоположного пола, который вам симпатичен?",
      options: ["Да", "Нет"],
    },
    {
      id: 13,
      text: "Часто ли вы действуете под влиянием момента?",
      options: ["Да", "Нет"],
    },
    {
      id: 15,
      text: "Предпочитаете ли вы чтение книг встречи с людьми?",
      options: ["Да", "Нет"],
    },
    {
      id: 20,
      text: "Стараетесь ли вы ограничить круг знакомств небольшим числом близких людей?",
      options: ["Да", "Нет"],
    },
    {
      id: 22,
      text: "Когда на вас кричат, отвечаете ли вы тем же?",
      options: ["Да", "Нет"],
    },
    {
      id: 27,
      text: "Считают ли вас человеком живым и веселым?",
      options: ["Да", "Нет"],
    },
    {
      id: 31,
      text: "Бывает ли, что вам не спится от того, что разные мысли лезут в голову?",
      options: ["Да", "Нет"],
    },
    {
      id: 34,
      text: "Нравится ли вам работа, которая требует пристального внимания?",
      options: ["Да", "Нет"],
    },
    {
      id: 37,
      text: "Верно ли, что вам неприятно бывать в компании, где постоянно подшучивают друг над другом?",
      options: ["Да", "Нет"],
    },
    {
      id: 44,
      text: "Верно ли, что вы такой любитель поговорить, что никогда не упустите удобного случая побеседовать с незнакомым человеком?",
      options: ["Да", "Нет"],
    },
    {
      id: 49,
      text: "Легко ли вас задевает критика ваших недостатков или вашей работы?",
      options: ["Да", "Нет"],
    },
    {
      id: 50,
      text: "Могли бы вы сказать, что вы уверенный в себе человек?",
      options: ["Да", "Нет"],
    },
  ];

  const [answers, setAnswers] = useState({});
  const [error, setError] = useState("");
  const [extrovertScores, setExtrovertScores] = useState({});
  const [neuroticismScores, setNeuroticismScores] = useState({});
  

  const extrovertQuestions = questions.filter(question => [1, 8, 13, 15, 20, 22, 27, 34, 37, 44, 49].includes(question.id));
  const neuroticismQuestions = questions.filter(question => ![1, 8, 13, 15, 20, 22, 27, 34, 37, 44, 49].includes(question.id));

  const handleOptionSelect = (questionId, optionIndex) => {
    const updatedAnswers = { ...answers, [questionId]: optionIndex };
    setAnswers(updatedAnswers);
  
    if (extrovertQuestions.find(question => question.id === questionId)) {
      if ([15, 20, 37].includes(questionId)) {
        setExtrovertScores(prevScores => ({ ...prevScores, [questionId]: optionIndex === 1 ? 1 : 0 }));
      } else {
        setExtrovertScores(prevScores => ({ ...prevScores, [questionId]: optionIndex === 0 ? 1 : 0 }));
      }
    } else if (neuroticismQuestions.find(question => question.id === questionId)) {
      setNeuroticismScores(prevScores => ({ ...prevScores, [questionId]: optionIndex === 0 ? 1 : 0 }));
    }
  };


  const calculateResult = () => {
    if (Object.keys(answers).length < questions.length) {
      setError("Пожалуйста, ответьте на все вопросы перед получением результата");
      return;
    }
  
    const extrovertScore = Object.values(extrovertScores).reduce((acc, curr) => acc + curr, 0);
    const neuroticismScore = Object.values(neuroticismScores).reduce((acc, curr) => acc + curr, 0);
    console.log(extrovertScore);
    console.log(neuroticismScore);
    const extrovertResult = extrovertScore > 8 ? "extrovert" : "introvert";
    const neuroticismResult = neuroticismScore > 3 ? "neurotic" : "stable";
  

    let type = ''

    if (extrovertResult === "extrovert" && neuroticismResult === "stable") (type = "sanguine")
    else if (extrovertResult === "extrovert" && neuroticismResult === "neurotic") (type = "choleric")
    else if (extrovertResult === "introvert" && neuroticismResult === "stable") (type = "melancholic")
    else if (extrovertResult === "introvert" && neuroticismResult === "neurotic") (type = "phlegmatic")

    userData.temperament = type;

    
    console.log(type)
    console.log(userData);
    register(userData);
  };

  const register = async (data) => {
    try {
      console.log(data);
      const response = await axios.post("http://localhost:5000/auth/", data);
      console.log(response.data); // Вывод ответа сервера для отладки
      navigate("/");
      getLoggedIn();
    } catch (error) {
      console.error("Ошибка при отправке запроса:", error);
      setError("Произошла ошибка при отправке запроса");
    }
  };

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
        <button className="temperamet_button" onClick={calculateResult}>Получить результат</button>
      </div>
    </div>
  );
}

export default TemperamentTest;
