import { useState } from "react";
import "./Login.css";

export default function Login() {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");

  function handleLogin(e) {
    e.preventDefault();

    if (user === "admin" && password === "1234") {
      setMsg("Login realizado com sucesso!");
      setTimeout(() => {
        window.location.href = "/home";
      }, 1000);
    } else {
      setMsg("Usuário ou senha incorretos!");
    }
  }

  return (
    <div className="container">
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
