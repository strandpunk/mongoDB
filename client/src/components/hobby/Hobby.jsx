import React, { useState, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import AuthContext from "../../context/AuthContext";
import "./Hobby.scss";

function Hobby() {
    const navigate = useNavigate();
    const location = useLocation();
    const userData = location.state;
    const { getLoggedIn } = useContext(AuthContext);

    const [selectedInterests, setSelectedInterests] = useState([]);

    const interests = [
        'Искусство',
        'Музыка',
        'Путешествия',
        'Фотография',
        'Еда и кулинария',
        'Спорт',
        'Кино и театр',
        'Литература',
        'Технологии',
        'Игры',
        'Наука',
        'Дизайн',
        'Мода',
    ];

    const toggleInterest = (interest) => {
        if (selectedInterests.includes(interest)) {
          setSelectedInterests(selectedInterests.filter((item) => item !== interest));
        } else {
          if (selectedInterests.length < 5) { // Проверяем лимит выбранных интересов
            setSelectedInterests([...selectedInterests, interest]);
          } else {
            alert('Можно выбрать не более 5 интересов.');
          }
        }
      };

    const handleSaveInterests = () => {
        console.log('Выбранные интересы:', selectedInterests);
        userData.hobby = selectedInterests
        console.log(userData)
        navigate("/test", { state: userData });
        // Здесь можно выполнить другие действия с выбранными интересами
    };

    const isInterestSelected = (interest) => {
        return selectedInterests.includes(interest);
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
            // setError("Произошла ошибка при отправке запроса");
        }
    };

    return (
        <>
            <div className="w123">
                <h2>Выберите ваши интересы:</h2>
                <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                    {interests.map((interest) => (
                        <button
                            key={interest}
                            style={{
                                margin: '5px',
                                padding: '8px',
                                backgroundColor: isInterestSelected(interest) ? 'lightblue' : 'white',
                                fontWeight: isInterestSelected(interest) ? 'bold' : 'normal',
                            }}
                            onClick={() => toggleInterest(interest)}
                        >
                            {interest}
                        </button>
                    ))}
                </div>
                <button onClick={handleSaveInterests} style={{ marginTop: '10px' }}>
                    Сохранить выбранные интересы
                </button>
            </div>
        </>
    );
}

export default Hobby;
