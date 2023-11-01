import axios from "axios";
import { useEffect, useRef, useState } from "react";

function User() {
  const [user, setUser] = useState({});

  async function getUser() {
    try {
      const userList = await axios.get("http://localhost:5000/auth/info");
      setUser(userList.data);
    } catch (error) {
      console.error("Ошибка при получении данных пользователя:", error);
    }
  }

  useEffect(() => {
    getUser();
    getImage();
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
    try {
      const formData = new FormData();
      formData.append("file", selectedFile);
      await axios.post("http://localhost:5000/uploads", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
    } catch (error) {
      console.error("Ошибка при получении данных пользователя:", error);
    }
  }

  //------------------image-------------------------

  const [allImages, setAllImages] = useState(null);

  const getImage = async () => {
    const result = await axios.get("http://localhost:5000/get-image");
    // console.log(result.data.data);
    setAllImages(result.data.data);
  };
  //----------------------------------------------------------

  return (
    <div>
      <div>
        <h1>Пользователь:</h1>
        <br></br>
        {user.name ? (
          <>
            <div>Имя: {user.name}</div>
            <div>Email: {user.email}</div>
            <div>Дата создания: {user.createdAt}</div>
            <div>Аватар: {user.avatar}</div>
            <img src={require(`../images/${user.avatar}`)} alt="img"></img>

            <button type="button" onClick={handlePick} className="registerbtn">
              ДОБАВИТЬ ФОТО
            </button>

            {allImages == null
              ? ""
              : allImages.map((data) => {
                  return (
                    <img
                      key={data._id}
                      src={require(`../images/${data.image}`)}
                      // height={100}
                      // width={100}
                    />
                  );
                })}

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
