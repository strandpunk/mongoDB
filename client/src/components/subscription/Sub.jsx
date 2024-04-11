import axios from "axios";

function Sub() {
  async function extendSub() {
    await axios.get("https://localhost:5000/auth/extendSub");
    alert("подписка продлена");
  }

  return (
    <button className="custom__btn-sub" onClick={extendSub}>
      Подписка
    </button>
  );
}

export default Sub;
