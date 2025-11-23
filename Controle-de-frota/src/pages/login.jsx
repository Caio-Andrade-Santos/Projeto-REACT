import { useState } from "react";
import "../App.css";

export default function Login({ onLoginSuccess }) {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");

  function handleLogin(e) {
    e.preventDefault();

    if (user === "admin" && password === "1234") {
      setMsg("Login realizado com sucesso!");

      setTimeout(() => {
        onLoginSuccess(); // <-- chama o App
      }, 800);
    } else {
      setMsg("Usuário ou senha incorretos!");
    }
  }

  return (
    <div className="container-login">
      <form className="loginForm" onSubmit={handleLogin}>
        <h2>Login</h2>

        <input
          type="text"
          placeholder="Usuário"
          value={user}
          onChange={(e) => setUser(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit">Entrar</button>

        <p className="msg">{msg}</p>
      </form>
    </div>
  );
}
