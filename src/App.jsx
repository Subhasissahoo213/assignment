import { useEffect } from "react";
import AppRoutes from "./routes/AppRoutes";
import { login } from "./auth/authService";

function App() {
  useEffect(() => {
    const token = localStorage.getItem("token");
    const hasAuthCode = window.location.search.includes("code=");

    if (!token && !hasAuthCode) {
      login();
    }
  }, []);

  return <AppRoutes />;
}

export default App;