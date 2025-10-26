import React from "react";
import { FaUser, FaBars, FaStar, FaSignOutAlt } from "react-icons/fa"; // adicionei FaSignOutAlt
import logoLumicaAI from "../../assets/logoLumicaAI.png"; 
import "./navbar.css";
import { useNavigate } from "react-router-dom";

export default function Sidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    sessionStorage.clear();
    navigate("/login");
  };

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <img src={logoLumicaAI} alt="Logo LumicaAI" className="sidebar-logo" />
        <h1 className="sidebar-title">LumicaAI</h1>
      </div>
      
      <div className="sidebar-section">
        <p className="sidebar-section-title">Sua Jornada</p>
        <div className="sidebar-item" onClick={() => navigate('/profile')}>
          <FaUser />
          <span>Perfil & Conquistas</span>
        </div>
        <div className="sidebar-xp">
          <FaStar style={{ marginRight: "8px", color: "#FFD700" }} />
          <span>120 XP</span>
        </div>
      </div>

      <div className="sidebar-section">
        <p className="sidebar-section-title">Histórico</p>
        <div
          className="sidebar-item"
          onClick={() => navigate("/lumicaChat")} 
        >
          <FaBars /> <span>LumicaChat</span>
        </div>
      </div>

      <div className="sidebar-footer">
        <button className="sidebar-button-sair" onClick={handleLogout}>
          <FaSignOutAlt style={{ marginRight: "8px" }} /> Sair
        </button>
      </div>
    </div>
  );
}
