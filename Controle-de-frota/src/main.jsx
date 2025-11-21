import { StrictMode, useState } from "react";
import { createRoot } from "react-dom/client";

import App from "./App.jsx";
import Login from "./pages/login.jsx";

function Main() {
  const [logado, setLogado] = useState(false);

  function loginRealizado() {
    setLogado(true);
  }

  return (
    <>
      {logado ? <App /> : <Login onLoginSuccess={loginRealizado} />}
    </>
  );
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Main />
  </StrictMode>
);
