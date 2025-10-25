import React from "react";
import Sidebar from "../../components/Sidebar";
import Expbar from "../../components/Expbar"; 
import "./profile.css";

export default function Profile() {
  return (
    <div className="profile-page">
      <Sidebar />

      <div className="profile-content">
        <h2 className="profile-title">Seu Perfil Vocacional</h2>
        <p className="profile-description">
          Este é o reflexo da sua jornada. Suas conquistas e traços descobertos
          são atualizados pela LumicaAI.
        </p>

        <div className="profile-expobar">
          <Expbar level={1} progress={45} /> 
        </div>

        <div className="profile-traits">
          <h3>Traços Vocacionais Descobertos</h3>
          <div className="traits-tags">
            <span className="trait">Analítico</span>
            <span className="trait">Estrategista</span>
            <span className="trait inactive">Empathy (Ainda Incipiente)</span>
            <span className="trait">Orientado a Dados</span>
          </div>
        </div>

        <div className="profile-achievements">
          <h3>Suas Conquistas</h3>
          <div className="achievements-cards">
            <div className="achievement-card">
              <div className="icon">📖</div>
              <div className="text">
                <strong>O Estrategista</strong>
                <p>Desbloqueado: (Ainda não)</p>
              </div>
            </div>
            <div className="achievement-card">
              <div className="icon">📄</div>
              <div className="text">
                <strong>O Explorador</strong>
                <p>Desbloqueado: (Ainda não)</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
