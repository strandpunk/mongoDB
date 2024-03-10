import DataList from "../data/DataList";
import axios from "axios";
import { useEffect, useState } from "react";

function FriendData(props) {
  const [data, setData] = useState([]);

  // ???
  useEffect(() => {
    async function getFriendData() {
      try {
        const friendId = props.data;
        const response = await axios.get(`http://localhost:5000/data/friend/${friendId}`);
        setData(response.data);
      } catch (error) {
        console.error('Ошибка при получении данных:', error);
        throw error; // Повторное выбрасывание ошибки, чтобы обработать ее во внешнем коде
      }
    }

    getFriendData();
  }, [props.data]); // Указываем props.data как зависимость

  return (
    <div>
      {data.length !== 0 ? (
        <DataList data={data} isFriend={true} />
      ) : (
        <div className="nodata">У этого человека пока нет записей</div>
      )}
    </div>
  );
}

export default FriendData;
