import React, { useState } from "react";
import capa from "../../assets/capaLumicaAI.png";
import { useNavigate } from "react-router-dom";
import "./login.css";
import { Auth } from "../../services/auth";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await Auth.login({ email, password });
      const { access_token, name: userName } = res.data;

      localStorage.setItem("token", access_token);
      if (userName) localStorage.setItem("userName", userName);

      navigate("/lumicaChat/1"); 
    } catch (err: any) {
      console.error("Erro no login:", err);
      alert(err.response?.data?.message || "Email ou senha inválidos!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="image-side">
        <img src={capa} alt="Imagem da logo do Lumica AI" />
      </div>

      <div className="form-side">
        <form className="form" onSubmit={handleLogin}>
          <div className="form-header">
            <h2>Bem-vindo de volta! Faça seu login.</h2>
          </div>

          <div className="input-group">
            <div className="input-box">
              <label htmlFor="email">E-mail</label>
              <input
                id="email"
                type="email"
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
                placeholder="Digite sua senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="login-button">
            <button type="submit" disabled={loading}>
              {loading ? "Entrando..." : "Entrar"}
            </button>
          </div>

          <div className="button-cadastro">
            <p>
              Não tem uma conta?{" "}
              <span className="spanCadastro" onClick={() => navigate("/register")}>
                Cadastre-se gratuitamente!
              </span>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
