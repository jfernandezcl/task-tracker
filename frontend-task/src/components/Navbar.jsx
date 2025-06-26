import "../styles/Navbar.css";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = (e) => {
    e.preventDefault();
    navigate("/login");
  };

  return (
    <>
      <div className="container-navbar">
        <button className="button-logout" onClick={handleLogout}>
          Log out
        </button>
      </div>
    </>
  );
}

export default Navbar;
