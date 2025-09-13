import React from "react";
import { Navigate, Route, Routes} from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";


const App = () => {
  
  return (
    <Routes>
      <Route path="/" element={<Navigate to='/login'/>}/>
      <Route path="/register" element={<Register/>} />
      <Route path="/login" element={<Login/>}/>
      <Route path="/dashboard" element={<Dashboard/>}/>
    </Routes>
  );
};

export default App;
