import axios from "axios";
import { useEffect, useRef, useState } from "react";
import "./User.css";
const moment = require('moment');

function User({ samuraiInfo, setSamuraiInfo }) {
  const [user, setUser] = useState({});

  async function getUser() {
    try {
      const userList = await axios.get("http://localhost:5000/auth/info");
      setUser(userList.data);
    } catch (error) {
      console.error("Ошибка при получении данных пользователя:", error);
    }
  }

  //--for--fun--
  useEffect(() => {
    // Создаём переменную для хранения id таймера
    let timerId;
    if (samuraiInfo === true) {
      // Устанавливаем таймер
      timerId = setTimeout(() => {
        // По истечении времени меняем значение переменной
        setSamuraiInfo(false);
      }, 1000);
    }
  
    // Возвращаем функцию очистки таймера для предотвращения утечки памяти
    return () => clearTimeout(timerId);
  }, [samuraiInfo, setSamuraiInfo]); // Зависимость только от samuraiInfo
  //------------

  
  useEffect(() => {
    getUser();
    // getImage();
  }, []);

  //----------------------------------------------------------
  const [selectedFile, setSelectedFile] = useState(null);

  const handlePick = () => {
    filePicker.current.click();
  };

  const filePicker = useRef(null);

  const handleChange = (e) => {
    console.log(e.target.files[0]);
    setSelectedFile(e.target.files[0]);
  };

  async function uploadPhoto() {
    if (selectedFile === null) {
      alert("Файл не выбран");
    } else {
      try {
        const formData = new FormData();
        formData.append("file", selectedFile);
        await axios.post("http://localhost:5000/auth/uploads", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      } catch (error) {
        console.error("Ошибка при получении данных пользователя:", error);
      }
    }
  }

  //------------------image-------------------------

  // const [allImages, setAllImages] = useState(null);

  // const getImage = async () => {
  //   const result = await axios.get("http://localhost:5000/auth/get-image");
  //   // console.log(result.data.data);
  //   setAllImages(result.data.data);
  // };
  //----------------------------------------------------------

  return (
    <div>
      <div className="user__info">
        {user.name ? (
          <>
            {samuraiInfo === true ? (<>

              <h1>Never fade away</h1>
              <br></br>
              <div className="user__wrapper">
                <div className="user__wrapper-text">
                  <div>Дата подписки: 20-aug-2023 04:45</div>
                  <div>Email: silverhand@yandex.ru</div>
                  <div>Тип темперамента: silverhand</div>
                  <div>Дата создания аккаунта: 20-aug-2023 04:45</div>
                  <div>Аватар: JOHNI-SILVERHAND-20aug2023-Q.jpg</div>
                </div>
                <img
                  style={{
                    height: "400px",
                    width: "250px",
                    objectFit: "cover",
                    borderRadius: "0px 8px 8px 0px",
                  }}
                  src={require(`../../gif/intro.gif`)}
                  alt="user-avatar"
                ></img>
              </div>

            </>) : (<>

              <h1>Пользователь {user.name}</h1>
              <br></br>
              <div className="user__wrapper">
                <div className="user__wrapper-text">
                  <div>Дата подписки: {moment(user.subDate).format('DD-MMM-YYYY HH:mm')}</div>
                  <div>Email: {user.email}</div>
                  <div>Тип темперамента: {user.temperament}</div>
                  <div>Дата создания аккаунта: {moment(user.createdAt).format('DD-MMM-YYYY HH:mm')}</div>
                  <div>Аватар: {user.avatar}</div>
                </div>
                <img
                  style={{
                    height: "400px",
                    width: "250px",
                    objectFit: "cover",
                    borderRadius: "0px 8px 8px 0px",
                  }}
                  src={require(`../../images/${user.avatar}`)}
                  alt="user-avatar"
                ></img>
              </div>
            </>)}

            <button type="button" onClick={handlePick} className="registerbtn">
              ДОБАВИТЬ ФОТО
            </button>

            {/* {allImages == null
              ? ""
              : allImages.map((data) => {
                  return (
                    <img
                      alt="user-images"
                      key={data._id}
                      src={require(`../images/${data.image}`)}
                    />
                  );
                })} */}

            <input
              onChange={handleChange}
              ref={filePicker}
              className="hidden"
              type="file"
              accept="image/*,.png,.jpg,.gif,.web"
            ></input>
            <button type="button" onClick={uploadPhoto} className="registerbtn">
              ЗАГРУЗИТЬ ФОТО
            </button>
            {selectedFile && <div>Photo: {selectedFile.name}</div>}
          </>
        ) : (
          <div>Загрузка...</div>
        )}
      </div>
    </div>
  );
}

export default User;
