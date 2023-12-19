import axios from "axios";
import { useEffect, useRef, useState } from "react";
import "./UserList.css";

function UsersList() {
  const [users, setUsers] = useState([]);
  const admin = useRef(false);

  async function getUsers() {
    const finded = await axios.get("http://localhost:5000/auth/get-users");
    setUsers(Array.from(finded.data));
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
            <h1>Пользователи сайта</h1>
            {/* {console.log(users)} */}
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
                        border: "1px solid black",
                      }}
                      alt="users-images"
                      src={require(`../images/${data.avatar}`)}
                    />
                    {admin.current === true ? (
                      <>
                        <button onClick={() => deleteUser(data._id)}>
                          delete
                        </button>
                      </>
                    ) : (
                      <></>
                    )}
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
