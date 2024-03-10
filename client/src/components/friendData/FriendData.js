import DataList from "../data/DataList";
import axios from "axios";
import { useEffect, useState } from "react";


function FriendData(props) {
  const [data, setData] = useState([]);


  async function getFriendData() {
    try {
      const friendId = props.data;
      const response = await axios.get(`http://localhost:5000/data/friend/${friendId}`);
      setData(response.data)
    } catch (error) {
      console.error('Ошибка при получении данных:', error);
      throw error; // Повторное выбрасывание ошибки, чтобы обработать ее во внешнем коде
    }
  }
  

  useEffect(() => {
    getFriendData();
  }, []);

  //   console.log(data);

  return (
    <div>
      {data.length !== 0 ? (
        <>
          <div>
            <DataList data={data} />
          </div>
        </>
      ) : (
        <>
          <div className="nodata">У этого человека пока нет записей</div>
        </>
      )}
    </div>
  );
}
export default FriendData;
