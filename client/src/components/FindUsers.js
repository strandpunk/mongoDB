import { useNavigate } from "react-router-dom";

function FindUsers() {
  const navigate = useNavigate();
  function nav() {
    navigate("/users");
  }

  return <button onClick={nav}>FindUsers</button>;
}

export default FindUsers;
