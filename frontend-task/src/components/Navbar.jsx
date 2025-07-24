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
