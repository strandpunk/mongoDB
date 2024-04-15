import axios from "axios";
import { useRef } from "react";
import "./User.scss";
const moment = require('moment');

function User({ user, getUser }) {

  //----------------------------------------------------------
  // const [selectedFile, setSelectedFile] = useState(null);


  const handlePick = () => {
    filePicker.current.click();
  };

  const filePicker = useRef(null);

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

  const handleChangeAndUpload = async (e) => {
    const file = e.target.files[0];

    if (!file) {
      alert("Файл не выбран");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("file", file);

      await axios.post("http://localhost:5000/auth/uploads", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      //ожидаем загрузку фото в базу данных
      setTimeout(() => {
        getUser();
      }, 1000);

    } catch (error) {
      console.error("Ошибка при загрузке фото:", error);
    }
  };


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
            <h1>{user.name}</h1>
            <br></br>
            <div className="user__wrapper">
              <div className="user__image-container">
                <img
                  style={{
                    height: "400px",
                    width: "300px",
                    objectFit: "cover",
                    borderRadius: "8px",
                  }}
                  src={require(`../../images/${user.avatar}`)}
                  alt="user-avatar"
                ></img>
                <div className="user__image-overlay" onClick={handlePick}>
                  {/* <p className="user__image-overlay-text">Текст поверх изображения</p> */}
                  <img className="user__image-overlay-icon" src={process.env.PUBLIC_URL + '/upload.svg'}alt="upload"></img>
                  <p>Обновить фото</p>
                </div></div>
              <input
                onChange={handleChangeAndUpload}
                ref={filePicker}
                className="hidden"
                type="file"
                accept="image/*,.png,.jpg,.gif,.web"
              ></input>
              <div className="user__wrapper-text">
                {/* <div>Дата подписки: {moment(user.subDate).format('DD-MMM-YYYY HH:mm')}</div>
                <div>Email: {user.email}</div>
                <div>Тип темперамента: {user.temperament}</div>
                <div>Дата создания аккаунта: {moment(user.createdAt).format('DD-MMM-YYYY HH:mm')}</div>
                <div>Аватар: {user.avatar}</div> */}
                <div>Возраст - {calculateAge(user.age)}</div>

                {user.hobby.length > 0 ? (
                  <>
                    <div>
                      <h3>Интересы - </h3><br></br>
                      <ul>
                        {user.hobby.map((hobby, index) => (
                          <li key={index}>{hobby}</li>
                        ))}
                      </ul>
                    </div>
                  </>
                ) : (
                  <p>Пользователь {user.name} пока не добавил хобби.</p>
                )}
              </div>
            </div>

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





    
          

            {/* <input
              onChange={handleChange}
              ref={filePicker}
              className="hidden"
              type="file"
              accept="image/*,.png,.jpg,.gif,.web"
            ></input>
            <button type="button" onClick={uploadPhoto} className="registerbtn">
              ЗАГРУЗИТЬ ФОТО
            </button>
            {selectedFile && <div>Photo: {selectedFile.name}</div>} */}
          </>
        ) : (
          <div>Загрузка...</div>
        )}
      </div>
    </div>
  );
}

export default User;
