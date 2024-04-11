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
