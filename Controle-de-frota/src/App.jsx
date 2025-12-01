import "./App.css";
import { useState, useEffect } from "react";
import iconUser from "./img/iconUser.png";
import Login from "./pages/login";
import AddVeiculo from "./components/AddVeiculo";
import ListaVeiculos from "./components/ListaVeiculos";
import EditarVeiculo from "./components/EditarVeiculo";
import Navbar from "./components/Navbar";

export default function App() {
  const [menuAberto, setMenuAberto] = useState(false);
  const [veiculos, setVeiculos] = useState([]);
  const [pagina, setPagina] = useState("menu");
  const [editando, setEditando] = useState(null);
  const [mensagem, setMensagem] = useState("");
  const [erro, setErro] = useState(false);

  const [buscaListar, setBuscaListar] = useState("");
  const [buscaEditar, setBuscaEditar] = useState("");
  const [buscaExcluir, setBuscaExcluir] = useState("");

  const toggleMenu = () => setMenuAberto(!menuAberto);

  const usuario = { nome: "Admin", foto: iconUser };

  // ---------------------- LISTAR VEÍCULOS ----------------------
  useEffect(() => {
    fetch("http://localhost:3001/listar")
      .then((res) => res.json())
      .then((data) => setVeiculos(data))
      .catch((err) => console.error("Erro ao carregar veículos:", err));
  }, []);

  // ---------------------- FUNÇÕES BACKEND ----------------------
  const adicionarVeiculo = async (veiculo, msg, isErro) => {
    if (!veiculo) {
      setMensagem(msg);
      setErro(isErro);
      setTimeout(() => setMensagem(""), 3000);
      return;
    }

    try {
      const response = await fetch("http://localhost:3001/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(veiculo),
      });
      const data = await response.json();

      if (response.ok) {
        setVeiculos([...veiculos, { ...veiculo, id: data.veiculo.id }]);
        setMensagem("Veículo adicionado com sucesso!");
        setErro(false);

        setTimeout(() => {
          setMensagem("");
          setPagina("menu");
        }, 2000);
      } else {
        setMensagem(data.mensagem || "Erro ao adicionar veículo.");
        setErro(true);
        setTimeout(() => setMensagem(""), 3000);
      }
    } catch (err) {
      console.error("Erro ao adicionar veículo:", err);
      setMensagem("Erro de conexão com o servidor.");
      setErro(true);
      setTimeout(() => setMensagem(""), 3000);
    }
  };

  const salvarEdicao = async (veiculoAtualizado, msg, isErro) => {
    if (!veiculoAtualizado) {
      setMensagem(msg);
      setErro(isErro);
      setTimeout(() => setMensagem(""), 3000);
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:3001/editar/${veiculoAtualizado.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(veiculoAtualizado),
        }
      );
      const data = await response.json();

      if (response.ok) {
        setVeiculos(
          veiculos.map((v) =>
            v.id === veiculoAtualizado.id ? veiculoAtualizado : v
          )
        );
        setMensagem("Veículo atualizado com sucesso!");
        setErro(false);

        setTimeout(() => {
          setMensagem("");
          setEditando(null);
          setPagina("menu");
        }, 2000);
      } else {
        setMensagem(data.mensagem || "Erro ao atualizar veículo.");
        setErro(true);
        setTimeout(() => setMensagem(""), 3000);
      }
    } catch (err) {
      console.error("Erro ao editar veículo:", err);
      setMensagem("Erro de conexão com o servidor.");
      setErro(true);
      setTimeout(() => setMensagem(""), 3000);
    }
  };

  const excluirVeiculo = async (id) => {
    if (!window.confirm("Tem certeza que deseja excluir este veículo?")) return;

    try {
      const response = await fetch(`http://localhost:3001/excluir/${id}`, {
        method: "DELETE",
      });
      const data = await response.json();

      if (response.ok) {
        setVeiculos(veiculos.filter((v) => v.id !== id));
        setMensagem("Veículo removido com sucesso!");
        setErro(false);
        setTimeout(() => setMensagem(""), 2000);
      } else {
        setMensagem(data.mensagem || "Erro ao excluir veículo.");
        setErro(true);
        setTimeout(() => setMensagem(""), 3000);
      }
    } catch (err) {
      console.error("Erro ao excluir veículo:", err);
      setMensagem("Erro de conexão com o servidor.");
      setErro(true);
      setTimeout(() => setMensagem(""), 3000);
    }
  };

  // ---------------------- RENDER ----------------------
  return (
    <>
      {pagina !== "login" && (
        <Navbar
          user={usuario}
          menuAberto={menuAberto}
          toggleMenu={toggleMenu}
          setPagina={setPagina}
        />
      )}

      <div className="app-container">
        {mensagem && (
          <p className={`${erro ? "add-erro" : "add-sucesso"} animar-msg`}>
            {mensagem}
          </p>
        )}

        {pagina === "login" && (
          <Login onLoginSuccess={() => setPagina("menu")} />
        )}

        {pagina !== "login" && (
          <>
            <h1>Sistema de Gerenciamento de Frota</h1>

            {pagina === "menu" && (
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
            )}

            {pagina === "listar" && (
              <>
                <h2>📋 Lista de Veículos</h2>
                <input
                  type="text"
                  placeholder="Pesquisar por modelo ou placa"
                  value={buscaListar}
                  onChange={(e) => setBuscaListar(e.target.value)}
                  style={{ width: "30%", margin: "15px 0" }}
                />
                <ListaVeiculos
                  veiculos={veiculos.filter(
                    (v) =>
                      v.modelo
                        .toLowerCase()
                        .includes(buscaListar.toLowerCase()) ||
                      v.placa.toLowerCase().includes(buscaListar.toLowerCase())
                  )}
                  setVeiculos={setVeiculos}
                  onExcluir={excluirVeiculo}
                />
                <button className="voltar" onClick={() => setPagina("menu")}>
                  Voltar
                </button>
              </>
            )}

            {pagina === "adicionar" && (
              <>
                <AddVeiculo
                  onAdicionar={adicionarVeiculo}
                  mensagem={mensagem}
                  erro={erro}
                />
                <button className="voltar" onClick={() => setPagina("menu")}>
                  Voltar
                </button>
              </>
            )}

            {pagina === "editar" && (
              <>
                {!editando ? (
                  <>
                    <h2>✏️ Selecionar Veículo para Editar</h2>
                    <input
                      type="text"
                      placeholder="Pesquisar por modelo ou placa"
                      value={buscaEditar}
                      onChange={(e) => setBuscaEditar(e.target.value)}
                      style={{ width: "30%", margin: "15px 0" }}
                    />
                    {veiculos
                      .filter(
                        (v) =>
                          v.modelo
                            .toLowerCase()
                            .includes(buscaEditar.toLowerCase()) ||
                          v.placa
                            .toLowerCase()
                            .includes(buscaEditar.toLowerCase())
                      )
                      .map((v) => (
                        <div key={v.id} className="lista-item">
                          {v.modelo} - {v.placa}
                          <button onClick={() => setEditando(v)}>Editar</button>
                        </div>
                      ))}
                    <button
                      className="voltar"
                      onClick={() => setPagina("menu")}
                    >
                      Voltar
                    </button>
                  </>
                ) : (
                  <EditarVeiculo
                    veiculo={editando}
                    onSalvar={salvarEdicao}
                    onCancelar={() => setEditando(null)}
                    mensagem={mensagem}
                    erro={erro}
                  />
                )}
              </>
            )}

            {pagina === "excluir" && (
              <>
                <h2>❌ Selecionar Veículo para Excluir</h2>
                <input
                  type="text"
                  placeholder="Pesquisar por modelo ou placa"
                  value={buscaExcluir}
                  onChange={(e) => setBuscaExcluir(e.target.value)}
                  style={{ width: "30%", margin: "15px 0" }}
                />
                <ListaVeiculos
                  veiculos={veiculos.filter(
                    (v) =>
                      v.modelo
                        .toLowerCase()
                        .includes(buscaExcluir.toLowerCase()) ||
                      v.placa.toLowerCase().includes(buscaExcluir.toLowerCase())
                  )}
                  setVeiculos={setVeiculos}
                  onExcluir={excluirVeiculo}
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
