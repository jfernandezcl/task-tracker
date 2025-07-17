import { FormEvent, useState } from "react";
import "../styles/Login-Register.css";
import { useNavigate } from "react-router-dom";

function Login(): JSX.Element  {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
        credentials: "include",
      });

      if (response.ok) {
        const { token } = await response.json();
        localStorage.setItem("token", token);
        navigate("/");
      } else {
        console.error("Error in login response:", response.statusText);
      }
    } catch (error) {
      console.error("Error in the login request:", error);
    }
  };

  return (
    <section className="container">
      <div className="background">
        <div className="shape"></div>
        <div className="shape"></div>
      </div>
      <form className="container-form">
        <h1 className="title-login">Login Here</h1>
        <label className="title-label">Email</label>
        <input
          className="input-form"
          type="text"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label className="title-label">Password</label>
        <input
          className="input-form"
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <div className="container-buttons">
          <button className="form-buttons" onClick={handleLogin}>
            Log In
          </button>
        </div>
        <div className="container-buttons">
          <button
            className="form-buttons"
            type="button"
            onClick={() => navigate("/register")}
          >
            Go to Register
          </button>
        </div>
      </form>
    </section>
  );
}

export default Login;
