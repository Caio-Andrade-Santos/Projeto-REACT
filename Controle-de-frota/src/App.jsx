import "./App.css";
import { useState, useEffect } from "react";
import Login from "./pages/login";
import AddVeiculo from "./components/AddVeiculo";
import ListaVeiculos from "./components/ListaVeiculos";
import EditarVeiculo from "./components/EditarVeiculo";
import Navbar from "./components/Navbar";

export default function App() {
  // Estados principais
  const [menuAberto, setMenuAberto] = useState(false);
  const [veiculos, setVeiculos] = useState([
    { id: 1, modelo: "Caminhão Baú", placa: "ABC-1234", tipo: "Carga", ano: 2020 },
    { id: 2, modelo: "Carreta", placa: "XYZ-5678", tipo: "Carga", ano: 2018 },
  ]);

  const [pagina, setPagina] = useState("menu");
  const [editando, setEditando] = useState(null);

  // Estados de busca
  const [buscaListar, setBuscaListar] = useState("");
  const [buscaEditar, setBuscaEditar] = useState("");
  const [buscaExcluir, setBuscaExcluir] = useState("");

  // Estados para mostrar input da lupa
  const [mostrarInputListar, setMostrarInputListar] = useState(false);
  const [mostrarInputEditar, setMostrarInputEditar] = useState(false);
  const [mostrarInputExcluir, setMostrarInputExcluir] = useState(false);

  // Quando troca de página → reseta lupas
  useEffect(() => {
    setMostrarInputListar(false);
    setMostrarInputEditar(false);
    setMostrarInputExcluir(false);
  }, [pagina]);

  // Alternar menu
  const toggleMenu = () => setMenuAberto(!menuAberto);

  // Salvar edição
  function salvarEdicao(veiculoAtualizado) {
    setVeiculos(
      veiculos.map((v) =>
        v.id === veiculoAtualizado.id ? veiculoAtualizado : v
      )
    );
    setEditando(null);
    setPagina("menu");
  }

  // Usuário do sistema
  const usuario = {
    nome: "Admin",
    foto: "https://i.imgur.com/6VBx3io.png"
  };

  return (
    <>
      {/* Navbar só aparece se não estiver na página de login */}
      {pagina !== "login" && (
        <Navbar
          user={usuario}
          menuAberto={menuAberto}
          toggleMenu={toggleMenu}
          setPagina={setPagina}
        />
      )}

      <div className="app-container">
        {/* Página Login */}
        {pagina === "login" && (
          <Login onLoginSuccess={() => setPagina("menu")} />
        )}

        {/* Demais páginas */}
        {pagina !== "login" && (
          <>
            <h1>Sistema de Gerenciamento de Frota</h1>

            {/* Página MENU */}
            {pagina === "menu" && (
              <>
                <div className="menu">
                  <button onClick={() => setPagina("listar")}>
                    📋 Listar Veículos
                  </button>
                  <button onClick={() => setPagina("adicionar")}>
                    ➕ Adicionar Veículo
                  </button>
                  <button onClick={() => setPagina("editar")}>
                    ✏️ Editar Veículo
                  </button>
                  <button onClick={() => setPagina("excluir")}>
                    ❌ Excluir Veículo
                  </button>
                </div>
                <button className="sair" onClick={() => setPagina("login")}>
                  Sair
                </button>
              </>
            )}

            {/* ---------------------------------------------------------------- */}
            {/*                             LISTAR                              */}
            {/* ---------------------------------------------------------------- */}
            {pagina === "listar" && (
              <>
                <h2 className="lista-item_ListaVeiculos_Titulo">📋 Lista de Veículos</h2>

                {/* Lupa (antes do clique) */}
                {!mostrarInputListar && (
                  <div
                    className="Pesquisa"
                    onClick={() => setMostrarInputListar(true)}
                    style={{
                      cursor: "pointer",
                      display: "flex",
                      justifyContent: "flex-end",
                      width: "100%",
                    }}
                  >
                    <h2>🔍︎</h2>
                  </div>
                )}

                {/* Input (aparece após clicar) */}
                {mostrarInputListar && (
                  <div style={{ display: "flex", justifyContent: "flex-end", width: "100%" }}>
                    <input
                      type="text"
                      className="add-input"
                      placeholder="Pesquisar por modelo ou placa  🔍︎"
                      value={buscaListar}
                      onChange={(e) => setBuscaListar(e.target.value)}
                      style={{ width: "28%", margin: "15px 20px" }}
                      autoFocus
                    />
                  </div>
                )}

                {/* Lista */}
                <ListaVeiculos
                  veiculos={veiculos.filter(
                    (v) =>
                      v.modelo.toLowerCase().includes(buscaListar.toLowerCase()) ||
                      v.placa.toLowerCase().includes(buscaListar.toLowerCase())
                  )}
                  setVeiculos={setVeiculos}
                />

                <button className="voltar" onClick={() => setPagina("menu")}>
                  Voltar
                </button>
              </>
            )}

            {/* ---------------------------------------------------------------- */}
            {/*                            ADICIONAR                           */}
            {/* ---------------------------------------------------------------- */}
            {pagina === "adicionar" && (
              <>
                <AddVeiculo veiculos={veiculos} setVeiculos={setVeiculos} />
                <button className="voltar" onClick={() => setPagina("menu")}>
                  Voltar
                </button>
              </>
            )}

            {/* ---------------------------------------------------------------- */}
            {/*                              EDITAR                             */}
            {/* ---------------------------------------------------------------- */}
            {pagina === "editar" && (
              <>
                {!editando ? (
                  <>
                    <h2 className="lista-item_ListaVeiculos_Titulo">
                      ✏️ Selecionar Veículo para Editar
                    </h2>

                    {/* Lupa */}
                    {!mostrarInputEditar && (
                      <div
                        className="Pesquisa"
                        onClick={() => setMostrarInputEditar(true)}
                        style={{
                          cursor: "pointer",
                          display: "flex",
                          justifyContent: "flex-end",
                          width: "100%",
                        }}
                      >
                        <h2>🔍︎</h2>
                      </div>
                    )}

                    {/* Input */}
                    {mostrarInputEditar && (
                      <div style={{ display: "flex", justifyContent: "flex-end", width: "100%" }}>
                        <input
                          type="text"
                          className="add-input"
                          placeholder="Pesquisar por modelo ou placa  🔍︎"
                          value={buscaEditar}
                          onChange={(e) => setBuscaEditar(e.target.value)}
                          style={{ width: "28%", margin: "15px 20px" }}
                          autoFocus
                        />
                      </div>
                    )}

                    {/* Lista filtrada */}
                    {veiculos
                      .filter(
                        (v) =>
                          v.modelo.toLowerCase().includes(buscaEditar.toLowerCase()) ||
                          v.placa.toLowerCase().includes(buscaEditar.toLowerCase())
                      )
                      .map((v) => (
                        <div key={v.id} className="lista-item">
                          {v.modelo} - {v.placa}
                          <button onClick={() => setEditando(v)}>Editar</button>
                        </div>
                      ))}
                  </>
                ) : (
                  <EditarVeiculo
                    veiculo={editando}
                    onSalvar={salvarEdicao}
                    onCancelar={() => setEditando(null)}
                  />
                )}

                <button className="voltar" onClick={() => setPagina("menu")}>
                  Voltar
                </button>
              </>
            )}

            {/* ---------------------------------------------------------------- */}
            {/*                             EXCLUIR                             */}
            {/* ---------------------------------------------------------------- */}
            {pagina === "excluir" && (
              <>
                <h2 className="lista-item_ListaVeiculos_Titulo">
                  ❌ Selecionar Veículo para Excluir
                </h2>

                {/* Lupa */}
                {!mostrarInputExcluir && (
                  <div
                    className="Pesquisa"
                    onClick={() => setMostrarInputExcluir(true)}
                    style={{
                      cursor: "pointer",
                      display: "flex",
                      justifyContent: "flex-end",
                      width: "100%",
                    }}
                  >
                    <h2>🔍︎</h2>
                  </div>
                )}

                {/* Input */}
                {mostrarInputExcluir && (
                  <div style={{ display: "flex", justifyContent: "flex-end", width: "100%" }}>
                    <input
                      type="text"
                      className="add-input"
                      placeholder="Pesquisar por modelo ou placa  🔍︎"
                      value={buscaExcluir}
                      onChange={(e) => setBuscaExcluir(e.target.value)}
                      style={{ width: "28%", margin: "15px 20px" }}
                      autoFocus
                    />
                  </div>
                )}

                {/* Lista filtrada */}
                <ListaVeiculos
                  veiculos={veiculos.filter(
                    (v) =>
                      v.modelo.toLowerCase().includes(buscaExcluir.toLowerCase()) ||
                      v.placa.toLowerCase().includes(buscaExcluir.toLowerCase())
                  )}
                  setVeiculos={setVeiculos}
                />

                <button className="voltar" onClick={() => setPagina("menu")}>
                  Voltar
                </button>
              </>
            )}

          </>
        )}
      </div>
    </>
  );
}
