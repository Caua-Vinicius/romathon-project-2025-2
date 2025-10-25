import React from "react";
import "./expbar.css";

interface ExpbarProps {
  level: number;
  progress: number; 
}

export default function Expbar({ level, progress }: ExpbarProps) {
  return (
    <div className="expbar">
      <p className="expbar-level">Nível de Clareza: {level}</p>
      <div className="expbar-progress">
        <div
          className="expbar-progress-bar"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      <p className="expbar-next-level">{progress}% para o Nível {level + 1}</p>
    </div>
  );
}
