import axios from "axios";
import { useRef, useState } from "react";
import "./User.scss";
const moment = require('moment');

function User({ user, getUser }) {

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

        //--надо--подумать--
        setTimeout(() => {
          getUser();
        }, 1000);

      } catch (error) {
        console.error("Ошибка при загрузке фото:", error);
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
            <h1>{user.name}</h1>
            <br></br>
            <div className="user__wrapper">

              <img className="user__image"
                style={{
                  height: "400px",
                  width: "300px",
                  objectFit: "cover",
                  borderRadius: "8px",
                }}
                src={require(`../../images/${user.avatar}`)}
                alt="user-avatar"
              ></img>
              <div className="user__wrapper-text">
                {/* <div>Дата подписки: {moment(user.subDate).format('DD-MMM-YYYY HH:mm')}</div>
                <div>Email: {user.email}</div>
                <div>Тип темперамента: {user.temperament}</div>
                <div>Дата создания аккаунта: {moment(user.createdAt).format('DD-MMM-YYYY HH:mm')}</div>
                <div>Аватар: {user.avatar}</div> */}
                <div>Возраст - {user.age}</div>
                <h2>Интересы - </h2>
                {user.hobby.length > 0 ? (
                  <ul>
                    {user.hobby.map((hobby, index) => (
                      <li key={index}>{hobby}</li>
                    ))}
                  </ul>
                ) : (
                  <p>Пользователь {user.name} пока не добавил хобби.</p>
                )}
              </div>
            </div>
            {/* <button type="button" onClick={handlePick} className="registerbtn">
              ДОБАВИТЬ ФОТО
            </button> */}

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
