import React, { useState } from "react";
import "./expbar.css";

export default function Expbar() {
  // Dados mocados
  const [level] = useState(3);
  const [progress] = useState(45);

  return (
    <div className="expbar">
      <p className="expbar-level">Nível de Clareza: {level}</p>
      <div className="expbar-progress">
        <div className="expbar-progress-bar" style={{ width: `${progress}%` }}></div>
      </div>
      <p className="expbar-next-level">{progress}% para o Nível {level + 1}</p>
    </div>
  );
}
