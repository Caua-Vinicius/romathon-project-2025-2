import React, { useState } from "react";
import capa from "../../assets/capaLumicaAI.png";
import "../Login/login.css";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const navigate = useNavigate();

  return (
    <div className="container">
      <div className="image-side">
        <img src={capa} alt="Imagem da logo do Lumica AI" />
      </div>

      <div className="form-side">
        <form className="form">
          <div className="form-header">
            <h2>Bem-vindo! Faça seu cadastro</h2>
          </div>

          <div className="input-group">
            <div className="input-box">
              <label htmlFor="name">Nome</label>
              <input
                id="name"
                type="text"
                name="name"
                placeholder="Digite seu nome"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="input-group">
            <div className="input-box">
              <label htmlFor="email">E-mail</label>
              <input
                id="email"
                type="email"
                name="email"
                placeholder="Digite seu e-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="input-group">
            <div className="input-box">
              <label htmlFor="password">Senha</label>
              <input
                id="password"
                type="password"
                name="password"
                placeholder="Digite sua senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="login-button">
            <button type="submit">Cadastrar</button>
          </div>
          
          <div className="button-cadastro">
            <p>
              Já tem uma conta?{" "}
              <span className="spanCadastro" onClick={() => navigate("/")}>
                Faça o Login!
              </span>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
