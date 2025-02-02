import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LandingPage from "../src/page/ui/LandingPage";
import Chat from "../src/page/ui/Chat";
import Account from "../src/page/ui/Account";
import Policy from "./page/ui/Policy";
import Login from "./page/ui/Login";
import Register from "./page/ui/Register";
import { checkAuth } from "../src/utils/auth";
import Modal from "./components/Modal";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route
          path="/chat"
          element={
            <PrivateRoute>
              <Chat />
            </PrivateRoute>
          }
        />
        <Route path="/account" element={<Account />} />
        <Route path="/policy" element={<Policy />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}

const PrivateRoute = ({ children }) => {
  const [user, setUser] = React.useState(null);

  React.useEffect(() => {
    const loadUser = async () => {
      const auth = await checkAuth();
      setUser(auth.user);
    };
    loadUser();
  }, []);

  if (!user) {
    return (
      <Modal show={true} onClose={() => (window.location.href = "/login")} />
    );
  }

  return children;
};

export default App;
