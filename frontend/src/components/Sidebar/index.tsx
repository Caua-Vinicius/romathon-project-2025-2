import React from "react";
import { FaUser, FaPlus, FaBars } from "react-icons/fa";
import logoLumicaAI from "../../assets/logoLumicaAI.png"; 
import "./navbar.css";
import Expbar from "../Expbar";
import { useNavigate } from "react-router-dom";

export default function Sidebar() {
  const navigate = useNavigate();

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <img src={logoLumicaAI} alt="Logo LumicaAI" className="sidebar-logo" />
        <h1 className="sidebar-title">LumicaAI</h1>
      </div>

      <button className="sidebar-button"
      onClick={() => navigate('/lumicaChat')}>
        Nova Jornada <FaPlus />
      </button>

      <div className="sidebar-section">
        <p className="sidebar-section-title">Sua Jornada</p>
        <div className="sidebar-item"
        onClick={() => navigate('/profile')}>
          <FaUser />
          <span>Perfil & Conquistas</span>
        </div>
      </div>

      <div className="sidebar-section">
        <p className="sidebar-section-title">Histórico</p>
        <div className="sidebar-item">
          <FaBars /> <span>Chats Anteriores</span>
        </div>
        <div className="sidebar-sublist">
          <span>Jornada 1: O Início</span>
          <span>Jornada 2: A Dúvida</span>
          <span>Jornada 3: A Superação</span>
          <span>Jornada 4: A Conquista</span>
        </div>
      </div>

       <Expbar level={1} progress={45} />
    </div>
  );
}
