import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
// import axios from "axios";
// import AuthContext from "../../context/AuthContext";
import "./Hobby.scss";

function Hobby() {
    const navigate = useNavigate();
    const location = useLocation();
    const userData = location.state;
    // const { getLoggedIn } = useContext(AuthContext);

    const [selectedInterests, setSelectedInterests] = useState([]);

    const interests = [
        'Искусство',
        'Музыка',
        'Путешествия',
        'Фотография',
        'Кулинария',
        'Спорт',
        'Кино и театр',
        'Литература',
        'Технологии',
        'Игры',
        'Наука',
        'Мода',
    ];

    const toggleInterest = (interest) => {
        // console.log(selectedInterests)
        if (selectedInterests.includes(interest)) {
            setSelectedInterests(selectedInterests.filter((item) => item !== interest));
        } else {
            if (selectedInterests.length < 5) { // Проверяем лимит выбранных интересов
                setSelectedInterests([...selectedInterests, interest]);
            } else {
                alert('Нужно выбрать не более 5 интересов.');
            }
        }
    };

    const handleSaveInterests = () => {
        if (selectedInterests.length >= 3) {
            // console.log('Выбранные интересы:', selectedInterests);
            userData.hobby = selectedInterests
            // console.log(userData)
            navigate("/test", { state: userData });
            // Здесь можно выполнить другие действия с выбранными интересами
        } else {
            alert('Нужно выбрать не менее 3 интересов.');
        }
    };

    const isInterestSelected = (interest) => {
        return selectedInterests.includes(interest);
    };

    return (
        <>
            <div className="hobby-wrapper">
                <div className="hobby-container">
                    <h3>Выберите ваши интересы:</h3>
                    <div style={{ display: 'flex', flexWrap: 'wrap', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                        {interests.map((interest) => (
                            <button
                                className="hobby-button"
                                key={interest}
                                style={{
                                    backgroundColor: isInterestSelected(interest) ? 'lightblue' : 'rgba(255, 255, 255, 0.411)',
                                    fontWeight: isInterestSelected(interest) ? 'bold' : 'normal',
                                }}
                                onClick={() => toggleInterest(interest)}
                            >
                                {interest}
                            </button>
                        ))}
                    </div>
                    <button className={'form__button'} onClick={handleSaveInterests} >
                    Сохранить выбранные интересы
                </button>
            </div>
        </div >
        </>
    );
}

export default Hobby;
