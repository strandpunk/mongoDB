import DataForm from "./DataForm";
import DataList from "./DataList";
import axios from "axios";
import { useEffect, useState } from "react";
import "./Data.scss";

function Data() {
  const [data, setData] = useState([]);

  async function getData() {
    const dataList = await axios.get("http://localhost:5000/data/");
    setData(dataList.data);
  }

  useEffect(() => {
    getData();
  }, []);

  //   console.log(data);

  return (
    <div>
      {data.length !== 0 ? (
        <>
          <div>
            <DataForm getData={getData} />
          </div>
          <div>
            <DataList data={data} getData = {getData} />
          </div>
        </>
      ) : (
        <>
          <div>
            <DataForm getData={getData} />
          </div>
          <div className="nodata">У вас пока нет записей</div>
        </>
      )}
    </div>
  );
}
export default Data;
