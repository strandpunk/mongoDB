import axios from "axios";
import { useEffect, useState } from "react";
import "./UserList.scss";
import { useNavigate } from "react-router-dom";

function Friends() {
  const [users, setUsers] = useState([]);

  const navigate = useNavigate()

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
                      {data.name} <br />
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
