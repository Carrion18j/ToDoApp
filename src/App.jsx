import React, { useEffect, useState } from "react";
import { Home, Login, NotFoundPage } from "./sections";
import { Routes, Route, useNavigate } from "react-router-dom";
import { auth } from "./config/firebaseConfig";

const App = () => {
  const [currentUser, setCurrentUser] = useState(false);
  const navigate = useNavigate()

  setTimeout(() => {
    setCurrentUser(auth?.currentUser?.email);
  }, 1000);

  useEffect(() => {
    if (currentUser) navigate("/");
    if (!currentUser) navigate("/login");
  }, [currentUser]);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default App;
