import { Routes, Route } from "react-router-dom";

import Login from "../pages/Login"; 
import Register from "../pages/Register";
import LumicaChat from "../pages/LumicaChat";
import Profile from "../pages/Profile";

function RoutesApp(){
    return(
        <Routes>
            <Route path="/" element={<Login/>} />
             <Route path="/register" element={<Register/>} />
             <Route path="/lumicaChat" element={<LumicaChat/>} />
             <Route path="/profile" element={<Profile/>} />
        </Routes>
    )
}

export default RoutesApp;