import axios from "axios";
import { useEffect, useRef, useState } from "react";
import "./UserList.scss";
import { useNavigate } from "react-router-dom";
const moment = require('moment');

function UsersList() {
  const [users, setUsers] = useState([]);
  const admin = useRef(false);

  const navigate = useNavigate();

  async function getUsers() {
    const finded = await axios.get("http://localhost:5000/auth/get-users");
    setUsers(Array.from(finded.data));
  }

  async function openUserProfile(data) {
    navigate('/friend', { state: data });
  }

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

  async function startChat(friendId, friendName) {
    const friendData = { friendId, friendName };
    await axios.post("http://localhost:5000/chat/startChat", friendData);
    addFriend(friendId);
  }

  async function addFriend(friendId) {
    const friendData = { friendId };
    await axios.post("http://localhost:5000/auth/addFriend", friendData);
    navigate("/chats");
  }

  async function isAdmin() {
    const adminData = await axios.get("http://localhost:5000/auth/isAdmin");
    admin.current = adminData.data.isAdmin;
  }

  async function deleteUser(id) {
    const deleteData = { id };
    await axios.post("http://localhost:5000/auth/delete-user", deleteData);
    getUsers();
  }

  useEffect(() => {
    getUsers();
    isAdmin();
  }, []);

  return (
    <div>
      <div>
        {users.length !== 0 ? (
          <>
            <div className="user__header">
              <h1>Пользователи сайта</h1>
            </div>
            {/* {console.log(users)} */}
            <div className="user__card-wrapper">
              {users.map(function (data) {
                return (
                  <div className="user__card" key={data._id}>
                    <div className="user__card-info">
                      {data.name} {calculateAge(data.age)}<br />
                      {data.city}
                      <br />
                    </div>                    
                    {admin.current === true ? (
                      <>
                      <img
                      style={{
                        minHeight: "350px",
                        maxHeight: "350px",
                        width: "250px",
                        objectFit: "cover",
                        borderRadius: "8px",
                        marginBottom: "10px",
                      }}
                      onClick={() => openUserProfile(data)}
                      alt="users-images"
                      src={require(`../../images/${data.avatar}`)}
                    />
                        <button
                          className="custom__btn"
                          onClick={() => deleteUser(data._id)}
                        >
                          Удалить
                        </button>
                      </>
                    ) : (
                      <>
                      <img
                      style={{
                        minHeight: "350px",
                        maxHeight: "350px",
                        width: "250px",
                        objectFit: "cover",
                        borderRadius: "8px",
                        marginBottom: "10px",
                      }}
                      alt="users-images"              
                      src={require(`../../images/${data.avatar}`)}
                    />
                        <button
                          className="custom__btn-sayHi"
                          onClick={() => startChat(data._id, data.name)}
                        >
                          Познакомиться
                        </button>
                      </>
                    )}
                  </div>
                );
              })}
            </div>
          </>
        ) : (
          <>
            <div className="user__header">
              <h3>Пользователи</h3>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default UsersList;
