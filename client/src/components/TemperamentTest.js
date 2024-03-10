import React, { useState } from "react";
import "./TemperamentTest.css"; // Стили можно определить в отдельном файле

function TemperamentTest() {
  const questions = [
    {
      id: 1,
      text: "Как вы реагируете на новые задачи или ситуации?",
      options: ["Быстро адаптируюсь и начинаю действовать", "Энергично принимаюсь за работу, не теряя времени", "Переживаю и чувствую себя неуверенно", "Медленно адаптируюсь, предпочитая рассмотреть все стороны вопроса"],
    },
    {
      id: 2,
      text: "Какой ваш обычный темп речи?",
      options: ["Очень быстрый и энергичный", "Быстрый и уверенный", "Медленный и задумчивый", "Медленный и спокойный"],
    },
    {
      id: 3,
      text: "Как вы реагируете на стресс?",
      options: ["Быстро реагирую, но легко могу переключиться на что-то другое", "Продолжаю работать, стремясь завершить текущую задачу", "Очень переживаю и могу забыть о других вещах", "Ощущаю внутреннее напряжение, но стараюсь сохранять спокойствие"],
    },
    {
      id: 4,
      text: "Как вы обычно проводите свободное время?",
      options: ["Активно и общительно, предпочитая новые впечатления", "Занимаюсь различными проектами или хобби", "Провожу время в одиночестве, занятый своими мыслями", "Предпочитаю спокойные занятия дома или чтение"],
    },
    {
      id: 5,
      text: "Как вы реагируете на изменения в планах или расписании?",
      options: ["Легко приспосабливаюсь к изменениям и ищу новые возможности", "Пытаюсь найти решение и продолжаю двигаться вперед", "Чувствую себя раздраженно или стрессованно", "Принимаю изменения смиренно и постепенно адаптируюсь"],
    },
  ];

  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState("");

  const handleOptionSelect = (questionId, optionIndex) => {
    setAnswers({ ...answers, [questionId]: optionIndex });
  };

  const calculateResult = () => {
    // Суммируем ответы и определяем тип темперамента
    const scores = { sanguine: 0, choleric: 0, melancholic: 0, phlegmatic: 0 };
    for (const answer in answers) {
      switch (answers[answer]) {
        case 0:
          scores.sanguine++;
          break;
        case 1:
          scores.choleric++;
          break;
        case 2:
          scores.melancholic++;
          break;
        case 3:
          scores.phlegmatic++;
          break;
        default:
          break;
      }
    }

    // Определяем результат по наибольшему количеству баллов
    const maxScore = Math.max(...Object.values(scores));
    if (scores.sanguine === maxScore) setResult("Сангвиник");
    else if (scores.choleric === maxScore) setResult("Холерик");
    else if (scores.melancholic === maxScore) setResult("Меланхолик");
    else if (scores.phlegmatic === maxScore) setResult("Флегматик");
  };

  return (
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
      <button onClick={calculateResult}>Получить результат</button>
      {result && <div className="result">Ваш тип темперамента: {result}</div>}
    </div>
  );
}

export default TemperamentTest;
