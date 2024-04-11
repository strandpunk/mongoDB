import { useNavigate } from "react-router-dom";

function FindUsers() {
  const navigate = useNavigate();
  function nav() {
    navigate("/users");
  }

  return (
    <button className="custom__btn-findUsers" onClick={nav}>
      Поиск
    </button>
  );
}

export default FindUsers;
