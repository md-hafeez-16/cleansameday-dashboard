import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Login from "./Pages/Onboarding/Login/Login";

function App() {
  return (
    <div className="bg-blue-gray-50 min-h-screen">
      <Router>
        <Routes>
        <Route path="/" element={<Login />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
