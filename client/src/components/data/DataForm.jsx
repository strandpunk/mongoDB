import axios from "axios";
import { useState } from "react";
import "./DataForm.scss";

function DataForm({ getData, onClose }) {
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
        await axios.post("http://localhost:5000/data/", Data);
        onClose();
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
          <textarea
            onChange={(e) => setData(e.target.value)}
            value={data}
            name="data"
            type="text"
            className="data__input"
            placeholder="Что будем публиковать?"
          />
          <button type="submit" className="data__sendBtn">
            ОТПРАВИТЬ
          </button>
        </div>
      </form>
    </div>
  );
}

export default DataForm;
