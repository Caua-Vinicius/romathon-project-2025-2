import React, { useState } from "react";
import capa from "../../assets/capaLumicaAI.png";
import { useNavigate } from "react-router-dom";
import "./login.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  return (
    <div className="container">
      <div className="image-side">
        <img src={capa} alt="Imagem da logo do Lumica AI" />
      </div>

      <div className="form-side">
        <form className="form">
          <div className="form-header">
            <h2>Bem-vindo de volta! Faça seu login.</h2>
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
            <button type="submit">Entrar</button>
          </div>

          <div className="button-cadastro">
            <p>
              Não tem uma conta?{" "}
              <span className="spanCadastro"
               onClick={() => navigate('/register')}
               >
                Cadastre-se gratuitamente!
              </span>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
