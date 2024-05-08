import { useLocation } from "react-router-dom";
import FriendData from "../friendData/FriendData";
import './Friend.scss'

const moment = require('moment');

function Friend() {

    const location = useLocation();
    const friend = location.state;

    const calculateAge = (birthDate) => {
        // Создаем объект Moment для текущей даты
        const currentDate = moment();
    
        // Создаем объект Moment для даты рождения
        const birthMoment = moment(birthDate);
    
        // Проверяем, является ли дата рождения позже текущей даты в текущем году
        // Если да, то уменьшаем год на 1, чтобы получить корректный возраст
        if (birthMoment.isAfter(currentDate)) {
          birthMoment.subtract(1, 'years');
        }
    
        // Вычисляем разницу между текущей датой и датой рождения в годах
        const ageInYears = currentDate.diff(birthMoment, 'years');
    
        return ageInYears;
      };

    return (
        <div className="home-wrapper">
            <div className="home-main">

                {friend ? (
                    <>
                        <div className="user__info">

                            <div className="user__info">
                                <h1>{friend.name}</h1>
                                <br></br>
                                <div className="user__wrapper">
                                    <div className="user__image-container">
                                        <img
                                            style={{
                                                height: "400px",
                                                width: "250px",
                                                objectFit: "cover",
                                                borderRadius: "8px",
                                            }}
                                            src={require(`../../images/${friend.avatar}`)}
                                            alt="user-avatar"
                                        ></img>
                                    </div>
                                    <div className="user__wrapper-text">
                {/* <div>Дата подписки: {moment(user.subDate).format('DD-MMM-YYYY HH:mm')}</div>
                <div>Email: {user.email}</div>
                <div>Тип темперамента: {user.temperament}</div>
                <div>Дата создания аккаунта: {moment(user.createdAt).format('DD-MMM-YYYY HH:mm')}</div>
                <div>Аватар: {user.avatar}</div> */}
                <div>Возраст - {calculateAge(friend.age)}</div>

                {friend.hobby.length > 0 ? (
                  <>
                    <div>
                      <h3>Интересы - </h3><br></br>
                      <ul>
                        {friend.hobby.map((hobby, index) => (
                          <li key={index}>{hobby}</li>
                        ))}
                      </ul>
                    </div>
                  </>
                ) : (
                  <p>Пользователь {friend.name} пока не добавил хобби.</p>
                )}
              </div>

                                </div>
                            </div>
                            <FriendData data={friend._id} />
                        </div>


                    </>
                ) : (
                    <div>Загрузка...</div>
                )}
            </div>
        </div>

    )
}

export default Friend;
