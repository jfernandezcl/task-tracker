import "../styles/Navbar.css";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = async (e) => {
    e.preventDefault();

    try {
      await fetch("http://localhost:3000/users/logout", {
        method: "POST",
        credentials: "include",
      });
      Cookies.remove("token");
      Cookies.remove("user");

      navigate("/login");
    } catch {
      throw new Error("Logout failed. Please try again later.");
    }
  };

  return (
    <header className="container-navbar">
      <div className="navbar-left">
        <button className="button-logout" onClick={handleLogout}>
          Log out
        </button>
      </div>
      <h1 className="navbar-title">TASK TRACKER</h1>
      <div className="navbar-right">
        <span className="navbar-icon">🌙</span>
      </div>
    </header>
  );
}

export default Navbar;
