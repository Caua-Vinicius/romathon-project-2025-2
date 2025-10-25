import React from "react";
import { FaArrowUp } from "react-icons/fa";
import Sidebar from "../../components/Sidebar"; 
import "./lumicaChat.css";

export default function ChatLumica() {
  return (
    <div className="chat-page">
      <Sidebar />

      <div className="chat-container">
        <div className="chat-header">
          <h2 className="chat-title">Sua Jornada Atual</h2>
          <span className="chat-status">Conectado ao LumicaAI</span>
        </div>

        <div className="chat-body">
          <div className="chat-message bot">
            <div className="chat-avatar">
              <div className="chat-circle"></div>
            </div>
            <div className="chat-bubble">
              Saudações. Eu sou a Lumica AI. Inicie sua jornada compartilhando o
              que nubla sua mente hoje.
            </div>
          </div>
        </div>

        <div className="chat-footer">
          <input
            type="text"
            placeholder="Pergunte à LumicaAI ou responda"
            className="chat-input"
          />
          <button className="chat-send">
            <FaArrowUp />
          </button>
        </div>
      </div>
    </div>
  );
}
