import axios from "axios";
import { useEffect, useState } from "react";
import "./UserList.css";

function UsersList() {
  const [users, setUsers] = useState([]);

  async function getUsers() {
    const finded = await axios.get("http://localhost:5000/auth/get-users");
    setUsers(Array.from(finded.data));
    console.log(finded.data);
  }

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div>
      <div>
        {users.length !== 0 ? (
          <>
            <h1>Пользователи сайта</h1>
            {console.log(users)}
            <div className="user__card-wrapper">
              {users.map(function (data) {
                return (
                  <div className="user__card" key={data._id}>
                    name: {data.name} <br />
                    city: {data.city}
                    <br />
                    email: {data.email}
                    <img
                      style={{
                        height: "400px",
                        width: "250px",
                        objectFit: "cover",
                        border: "2px solid black",
                      }}
                      alt="users-images"
                      src={require(`../images/${data.avatar}`)}
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

export default UsersList;
