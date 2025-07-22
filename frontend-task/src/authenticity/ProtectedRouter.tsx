import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";


const ProtectedRouter = ({ children }: { children: JSX.Element }) => {
  const [isValid, setIsValid] = useState <boolean | null>(null);

  useEffect(() => {
    const verify = async () => {
      const token = Cookies.get("token");
      if (!token) {
        setIsValid(false);
        return;
      }

      try{
        const response = await fetch("http://localhost:3000/api/auth/verify", {
          headers: { Authorization : `Bearer ${token}` },
           credentials: "include",
        });

        if (!response.ok) {
          setIsValid(false);
          throw new Error("Token verification failed");
        }
      } catch {
        Cookies.remove("token");
        Cookies.remove("user");
        setIsValid(false);
      }
    }
    verify();
  },[]);

  if (isValid === false) return <p>Loading...</p>
  if (!isValid) return <Navigate to="/login" replace />;
  return children;
}

export default ProtectedRouter;