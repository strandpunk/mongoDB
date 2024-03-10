import { useLocation } from "react-router-dom";
import FriendData from "../friendData/FriendData";
import './Friend.css'


function Friend() {

    const location = useLocation();
    const friend = location.state;

    return (
        <div>

            {friend ? (
                <>
                    <div className="friendHome-wrapper">
                        <div className="friendHome-main">
                            <div className="user__info">
                                <h1>Пользователь {friend.name}</h1>
                                <br></br>
                                <div className="user__wrapper">
                                    <div className="user__wrapper-text">
                                        <div>Дата подписки: {friend.subDate}</div>
                                        <div>Email: {friend.email}</div>
                                        <div>Тип темперамента: {friend.temperament}</div>
                                        <div>Дата создания аккаунта: {friend.createdAt}</div>
                                        <div>Аватар: {friend.avatar}</div>
                                    </div>

                                    <img
                                        style={{
                                            height: "400px",
                                            width: "250px",
                                            objectFit: "cover",
                                            borderRadius: "0px 8px 8px 0px",
                                        }}
                                        src={require(`../../images/${friend.avatar}`)}
                                        alt="user-avatar"
                                    ></img>
                                </div>
                            </div>
                            <FriendData data={friend._id} />
                        </div>
                    </div>

                </>
            ) : (
                <div>Загрузка...</div>
            )}
        </div>

    )
}

export default Friend;
