import axios from "axios";
import { useState } from "react";
import "./DataForm.css";

function DataForm({ getData }) {
  const [data, setData] = useState("");

  async function saveData(e) {
    e.preventDefault();

    if (data.length === 0) {
      alert('Вы ничего не написали')
    } else {
      try {
        const Data = {
          content: data,
        };
        await axios.post("https://localhost:5000/data/", Data);
        getData();
        setData('')
      } catch (error) {
        console.error(error);
      }
    }


  }

  return (
    <div className="dataForm-wrapper">
      <form onSubmit={saveData}>
        <div className="form_content">
          <input
            onChange={(e) => setData(e.target.value)}
            value={data}
            name="data"
            type="text"
            placeholder="Введите информацию...."
          />
          <button type="submit" className="registerbtn">
            ОТПРАВИТЬ
          </button>
        </div>
      </form>
    </div>
  );
}

export default DataForm;
