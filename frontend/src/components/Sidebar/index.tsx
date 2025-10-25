import React, { useEffect, useState } from "react";
import { FaUser, FaPlus, FaBars } from "react-icons/fa";
import logoLumicaAI from "../../assets/logoLumicaAI.png"; 
import "./navbar.css";
import Expbar from "../Expbar";
import { useNavigate } from "react-router-dom";
import { api } from "../../services/api"; 

interface IChatSession {
  id: string;
  title: string;
}

export default function Sidebar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [sessions, setSessions] = useState<IChatSession[]>([]);

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }

    const fetchSessions = async () => {
      try {
        const res = await api.get("/chat/sessions", {
          headers: { Authorization: `Bearer ${token}` },
        });
        // Supondo que o backend retorne um array de sessões { id, title }
        setSessions(res.data);
      } catch (err) {
        console.error("Erro ao buscar sessões:", err);
      }
    };

    fetchSessions();
  }, [navigate, token]);

  const handleLogout = () => {
    localStorage.clear();
    sessionStorage.clear();
    navigate("/login");
  };

  const handleNewSession = async () => {
    if (!token) return;

    try {
      const res = await api.post(
        "/chat/sessions",
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const newSession = {
        id: res.data.sessionId || res.data.id,
        title: `Jornada ${sessions.length + 1}`,
      };
      setSessions((prev) => [newSession, ...prev]); // Atualiza a lista dinamicamente
      navigate(`/lumicaChat/${newSession.id}`);
    } catch (err) {
      console.error("Erro ao criar nova jornada:", err);
      alert("Não foi possível criar nova jornada. Tente novamente.");
    }
  };

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <img src={logoLumicaAI} alt="Logo LumicaAI" className="sidebar-logo" />
        <h1 className="sidebar-title">LumicaAI</h1>
      </div>

      <button className="sidebar-button" onClick={handleNewSession}>
        Nova Jornada <FaPlus />
      </button>

      <div className="sidebar-section">
        <p className="sidebar-section-title">Sua Jornada</p>
        <div className="sidebar-item" onClick={() => navigate('/profile')}>
          <FaUser />
          <span>Perfil & Conquistas</span>
        </div>
      </div>

      <div className="sidebar-section">
        <p className="sidebar-section-title">Histórico</p>
        <div className="sidebar-item">
          <FaBars /> <span>Chats Anteriores</span>
        </div>
        <div className="sidebar-sublist scrollable">
          {sessions.map((session) => (
            <span key={session.id} onClick={() => navigate(`/lumicaChat/${session.id}`)}>
              {session.title}
            </span>
          ))}
        </div>
      </div>

      <Expbar />

      <div className="sidebar-footer">
        <button className="sidebar-button-sair" onClick={handleLogout}>
          Sair
        </button>
      </div>
    </div>
  );
}
