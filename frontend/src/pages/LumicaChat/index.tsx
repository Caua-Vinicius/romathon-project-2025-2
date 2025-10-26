import React, { useEffect, useState } from "react";
import { FaArrowUp, FaStar } from "react-icons/fa"; 
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import { IMessage } from "../../interfaces/IMessage";
import { api } from "../../services/api"; 
import "./lumicaChat.css";

export default function LumicaChat() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [sessionId, setSessionId] = useState<string | null>(null);
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }

    const initSession = async () => {
      try {
        const res = await api.post(
          "/chat/sessions",
          {},
          { headers: { Authorization: `Bearer ${token}` } }
        );

        const newSessionId = res.data.sessionId || res.data.id;
        setSessionId(newSessionId);
        localStorage.setItem("sessionId", newSessionId);
        
        setMessages([
          {
            sessionId: newSessionId,
            content:
              "Saudações. Eu sou a Lumica AI. E vou te ajudar a identificar suas habilidades. Comece me contando características de você",
            sender: "bot",
          },
        ]);
      } catch (err) {
        console.error("Erro ao criar sessão:", err);
        alert("Não foi possível iniciar a sessão. Tente novamente.");
      }
    };

    initSession();
  }, [navigate, token]);

  const handleSend = async () => {
    if (!input.trim() || !sessionId) return;

    const userMessage: IMessage = { sessionId, content: input, sender: "user" };
    setMessages((prev) => [...prev, userMessage]);
    setLoading(true);

    try {
      const res = await api.post(
        `/chat/sessions/${sessionId}/message`,
        { content: input },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const botMessage: IMessage = {
        sessionId,
        content: res.data.content,
        sender: "bot",
      };
      setMessages((prev) => [...prev, botMessage]);
    } catch (err) {
      console.error("Erro ao enviar mensagem:", err);
      setMessages((prev) => [
        ...prev,
        { sessionId, content: "Erro ao enviar mensagem. Tente novamente.", sender: "bot" },
      ]);
    } finally {
      setInput("");
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleSend();
  };

  return (
    <div className="chat-page">
      <Sidebar />
      <div className="chat-container">
        <div className="chat-header">
          <h2 className="chat-title">
            <FaStar style={{ marginRight: "8px", color: "#FFD700" }} /> 
            Sua Jornada 
          </h2>
          <span className="chat-status">{loading ? "Enviando..." : "Conectado ao LumicaAI"}</span>
        </div>

        <div className="chat-body">
          {messages.map((msg, index) => (
            <div key={index} className={`chat-message ${msg.sender}`}>
              {msg.sender === "bot" && (
                <div className="chat-avatar">
                  <div className="chat-circle"></div>
                </div>
              )}
              <div className="chat-bubble">{msg.content}</div>
            </div>
          ))}
        </div>

        <div className="chat-footer">
          <input
            type="text"
            placeholder="Pergunte à LumicaAI ou responda"
            className="chat-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyPress}
            disabled={loading || !sessionId}
          />
          <button className="chat-send" onClick={handleSend} disabled={loading || !sessionId}>
            <FaArrowUp />
          </button>
        </div>
      </div>
    </div>
  );
}
