import React, { useState } from "react";
import Sidebar from "../../components/Sidebar";
import Expbar from "../../components/Expbar";
import "./profile.css";

interface IProfileData {
  traits: string[];
  achievements: { id: string; name: string; unlockedAt?: string }[];
}

export default function Profile() {
  // Dados mocados
  const [profile] = useState<IProfileData>({
    traits: ["Criativa", "Organizada", "Persistente"],
    achievements: [
      { id: "1", name: "Primeira Jornada", unlockedAt: "2025-10-25" },
      { id: "2", name: "Conquista XP" },
    ],
  });

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
          <Expbar />
        </div>

        <div className="profile-traits">
          <h3>Traços Vocacionais Descobertos</h3>
          <div className="traits-tags">
            {profile.traits.length > 0 ? (
              profile.traits.map((trait, index) => (
                <span key={index} className="trait">{trait}</span>
              ))
            ) : (
              <span className="trait inactive">Nenhum traço descoberto ainda</span>
            )}
          </div>
        </div>

        <div className="profile-achievements">
          <h3>Suas Conquistas</h3>
          <div className="achievements-cards">
            {profile.achievements.length > 0 ? (
              profile.achievements.map((ach) => (
                <div key={ach.id} className="achievement-card">
                  <div className="icon">🏆</div>
                  <div className="text">
                    <strong>{ach.name}</strong>
                    <p>Desbloqueado: {ach.unlockedAt || "(Ainda não)"}</p>
                  </div>
                </div>
              ))
            ) : (
              <p>Nenhuma conquista desbloqueada ainda</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
