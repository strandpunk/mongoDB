import axios from "axios"; 
import { useEffect, useState } from "react"; 
 
function User() { 
  const [user, setUser] = useState({}); 
 
  async function getUser() { 
    try { 
      const userList = await axios.get('http://localhost:5000/auth/info'); 
      setUser(userList.data); 
    } catch (error) { 
      console.error("Ошибка при получении данных пользователя:", error); 
    } 
  } 
 
  useEffect(() => { 
    getUser(); 
  }, []); 
 
  return ( 
    <div> 
      <div> 
        <h1>Пользователь:</h1><br></br> 
        {user.name ? ( 
          <> 
            <div>Имя: {user.name}</div> 
            <div>Email: {user.email}</div> 
            <div>Дата создания: {user.createdAt}</div> 
            <div>Аватар: {user.avatar}</div> 
            <img src={require(`../images/${user.avatar}`)} alt='img'></img> 
          </> 
        ) : ( 
          <div>Загрузка...</div> 
        )} 
      </div> 
    </div> 
  ); 
} 
 
export default User;