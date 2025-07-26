import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "./authProvider";

const RequireAuth = ({ children }) => {
  const { isLoggedIn, loading, Login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [tryingToLogin, setTryingToLogin] = useState(false);

  useEffect(() => {
    if (!loading && !isLoggedIn) {
      if (!tryingToLogin) {
        setTryingToLogin(true);
        Login(); 
      }
    }

    if (!loading && !isLoggedIn && tryingToLogin) {
      navigate("/", { replace: true });
    }
  }, [loading, isLoggedIn]);

  if (loading || !isLoggedIn) {
    return (
      <div className="h-screen w-screen flex items-center justify-center">
        <p className="text-gray-500 text-lg animate-pulse">
          Checking your authentication status
        </p>
      </div>
    );
  }

  return children;
};

export default RequireAuth;
