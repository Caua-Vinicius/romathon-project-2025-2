import React, { useState } from "react";
import capa from "../../assets/capaLumicaAI.png";
import "../Login/login.css";
import { useNavigate } from "react-router-dom";
import { Auth } from "../../services/auth";
import { IRegister } from "../../interfaces/IRegister";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ name?: string; email?: string; password?: string }>({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const validate = () => {
    const newErrors: typeof errors = {};
    if (!name.trim()) newErrors.name = "Nome é obrigatório";
    if (!email.trim()) newErrors.email = "E-mail é obrigatório";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) newErrors.email = "Formato de e-mail inválido";
    if (!password.trim() || password.trim().length < 6) newErrors.password = "Senha deve ter ao menos 6 caracteres";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);

    const userData: IRegister = { name, email, password };

    try {
      const response = await Auth.register(userData);
      const { token, name: userName } = response.data;

      localStorage.setItem("token", token);
      localStorage.setItem("userName", userName);

      navigate("/lumicaChat/1");
    } catch (error: any) {
      console.error(error);
      alert(
        error.response?.data?.message || "Erro ao cadastrar. Tente novamente mais tarde."
      );
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
        <form className="form" onSubmit={handleRegister} noValidate>
          <div className="form-header">
            <h2>Bem-vindo! Faça seu cadastro</h2>
          </div>

          <div className="input-group">
            <div className="input-box">
              <label htmlFor="name">Nome</label>
              <input
                id="name"
                type="text"
                placeholder="Digite seu nome"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              {errors.name && <small style={{ color: "red" }}>{errors.name}</small>}
            </div>
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
              />
              {errors.email && <small style={{ color: "red" }}>{errors.email}</small>}
            </div>
          </div>

          <div className="input-group">
            <div className="input-box">
              <label htmlFor="password">Senha</label>
              <input
                id="password"
                type="password"
                placeholder="Digite sua senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {errors.password && <small style={{ color: "red" }}>{errors.password}</small>}
            </div>
          </div>

          <div className="login-button">
            <button type="submit" disabled={loading}>
              {loading ? "Cadastrando..." : "Cadastrar"}
            </button>
          </div>

          <div className="button-cadastro">
            <p>
              Já tem uma conta?{" "}
              <span className="spanCadastro" onClick={() => navigate("/login")}>
                Faça o Login!
              </span>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
