import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";


const ProtectedRouter = ({ children }: { children: JSX.Element }) => {
  const [isValid, setIsValid] = useState <boolean | null>(null);

  useEffect(() => {
    const verify = async () => {

      try{
        const response = await fetch("http://localhost:3000/api/auth/verify", {
           credentials: "include",
        });

        if (!response.ok) {
          setIsValid(false);
          throw new Error("Token verification failed");
        }

         setIsValid(true);
      } catch {
        Cookies.remove("token");
        Cookies.remove("user");
        setIsValid(false);
      }
    }
    verify();
  },[]);


  if (isValid === null) return <p>Loading...</p>
  if (isValid === false) return <Navigate to="/login" replace />;
  return children;
}

export default ProtectedRouter;