import axios from "axios";
import { useEffect, useState } from "react";
import "./UserList.scss";
import { useNavigate } from "react-router-dom";
const moment = require('moment');

function Friends() {
  const [users, setUsers] = useState([]);

  const navigate = useNavigate()

  
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

  async function getFriends() {
    const finded = await axios.get("http://localhost:5000/auth/get-friends");
    setUsers(Array.from(finded.data));
  }

  async function openFriendProfile(data) {
    navigate('/friend', { state: data });
  }

  useEffect(() => {
    getFriends();
  }, []);

  return (
    <div>
      <div>
        {users.length !== 0 ? (
          <>
            <div className="user__header">
              <h1>Знакомые</h1>
            </div>
            {/* {console.log(users)} */}
            <div className="user__card-wrapper">
              {users.map(function (data) {
                return (
                  <div className="user__card" key={data._id} onClick={() => openFriendProfile(data)}>
                    <div className="user__cardInfo">
                      {data.name} {calculateAge(data.age)}<br />
                      {data.city}
                      <br />
                      {/* email: {data.email} */}
                    </div>
                    <img
                      style={{
                        height: "300px",
                        width: "200px",
                        objectFit: "cover",
                        borderRadius: "8px",
                        marginBottom: "20px",
                      }}
                      alt="users-images"
                      src={require(`../../images/${data.avatar}`)}
                    />
                  </div>
                );
              })}
            </div>
          </>
        ) : (
          <div>Загрузка...</div>
        )}
      </div>
    </div>
  );
}

export default Friends;
