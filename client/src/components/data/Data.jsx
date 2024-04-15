// import DataForm from "./DataForm";
import DataList from "./DataList";
import axios from "axios";
import { useEffect, useState } from "react";
import "./Data.scss";
import Popup from "../popup/Popup";

function Data() {
  const [data, setData] = useState([]);

  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const openPopup = () => {
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };

  async function getData() {
    const dataList = await axios.get("http://localhost:5000/data/");
    setData(dataList.data);
  }

  useEffect(() => {
    getData();
  }, []);

  //   console.log(data);

  return (
    <>
      {data.length !== 0 ? (
        <>
          {/* <div>
            <DataForm getData={getData} />
          </div> */}
                  <button type="button" onClick={openPopup} className="registerbtn">
              ДОБАВИТЬ ЗАПИСЬ
            </button>
          <div>
            <DataList data={data} getData={getData} />
          </div>
          <Popup isOpen={isPopupOpen} onClose={closePopup} getData={getData}/>
        </>
      ) : (
        <>
                <button type="button" onClick={openPopup} className="registerbtn">
              ДОБАВИТЬ ЗАПИСЬ
            </button>
            <Popup isOpen={isPopupOpen} onClose={closePopup} getData={getData}/>
          {/* <div>
            <DataForm getData={getData} />
          </div> */}
          <div className="data__nodata">Здесь будут находиться ваши публикации</div>
        </>
      )}
    </>
  );
}
export default Data;
