import "./App.css";
import { useState, useEffect } from "react";
import iconUser from "./img/iconUser.png";

import Login from "./pages/login";
import AddVeiculo from "./components/AddVeiculo";
import ListaVeiculos from "./components/ListaVeiculos";
import EditarVeiculo from "./components/EditarVeiculo";
import Navbar from "./components/Navbar";

export default function App() {
  // ---------------------- ESTADOS GERAIS DA APLICAÇÃO ----------------------
  // controla se o menu lateral está aberto
  const [menuAberto, setMenuAberto] = useState(false);

  // lista de veículos carregados do backend
  const [veiculos, setVeiculos] = useState([]);

  // controla qual tela está aberta: menu, listar, adicionar, editar, excluir
  const [pagina, setPagina] = useState("menu");

  // armazena qual veículo está sendo editado
  const [editando, setEditando] = useState(null);

  // mensagens de sucesso ou erro exibidas na tela
  const [mensagem, setMensagem] = useState("");
  const [erro, setErro] = useState(false);

  // estados que controlam o texto digitado nos campos de busca
  const [buscaListar, setBuscaListar] = useState("");
  const [buscaEditar, setBuscaEditar] = useState("");
  const [buscaExcluir, setBuscaExcluir] = useState("");

  const toggleMenu = () => setMenuAberto(!menuAberto);

  // usuário apenas para exibição (simulação de login)
  const usuario = { nome: "Admin", foto: iconUser };

  // ---------------------- CARREGAR VEÍCULOS DO BACKEND ----------------------
  useEffect(() => {
    // executa APENAS uma vez ao abrir a aplicação
    fetch("http://localhost:3001/listar")
      .then((res) => res.json())
      .then((data) => setVeiculos(data)) // salva no estado global
      .catch((err) => console.error("Erro ao carregar veículos:", err));
  }, []);

  // ---------------------- ADICIONAR VEÍCULO ----------------------
  const adicionarVeiculo = async (veiculo, msg, isErro) => {
    // se o formulário mandou erro, exibe a mensagem e volta
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
        // adiciona o veículo novo na lista local
        setVeiculos([...veiculos, { ...veiculo, id: data.veiculo.id }]);

        // exibe mensagem
        setMensagem("Veículo adicionado com sucesso!");
        setErro(false);

        // some mensagem e volta ao menu
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

  // ---------------------- EDITAR VEÍCULO ----------------------
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
        // substitui o veículo antigo pelo atualizado
        setVeiculos(
          veiculos.map((v) =>
            v.id === veiculoAtualizado.id ? veiculoAtualizado : v
          )
        );

        setMensagem("Veículo atualizado com sucesso!");
        setErro(false);

        setTimeout(() => {
          setMensagem("");
          setEditando(null); // encerra modo de edição
          setPagina("menu"); // volta ao menu
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

  // ---------------------- EXCLUIR VEÍCULO ----------------------
  const excluirVeiculo = async (id) => {
    if (!window.confirm("Tem certeza que deseja excluir este veículo?")) return;

    try {
      const response = await fetch(`http://localhost:3001/excluir/${id}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (response.ok) {
        // remove da lista local
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

  // ---------------------- RENDERIZAÇÃO DA TELA ----------------------
  return (
    <>
      {/* Navbar aparece em todas as páginas, menos login */}
      {pagina !== "login" && (
        <Navbar
          user={usuario}          // <-- PROP: envia usuário para exibir foto e nome
          menuAberto={menuAberto} // <-- PROP: controla se o menu está aberto
          toggleMenu={toggleMenu} // <-- PROP: função para abrir/fechar
          setPagina={setPagina}   // <-- PROP: permite que a Navbar mude de tela
        />
      )}

      <div className="app-container">
        {/* mensagem de sucesso/erro */}
        {mensagem && (
          <p className={`${erro ? "add-erro" : "add-sucesso"} animar-msg`}>
            {mensagem}
          </p>
        )}

        {/* Tela de Login */}
        {pagina === "login" && (
          <Login onLoginSuccess={() => setPagina("menu")} />
          // PROP onLoginSuccess → permite que o componente Login avise ao App que o login deu certo
        )}

        {/* A partir daqui, páginas internas */}
        {pagina !== "login" && (
          <>
            <h1>Sistema de Gerenciamento de Frota</h1>

            {/* Menu Principal */}
            {pagina === "menu" && (
              <div className="menu">
                <button onClick={() => setPagina("listar")}>📋 Listar Veículos</button>
                <button onClick={() => setPagina("adicionar")}>➕ Adicionar Veículo</button>
                <button onClick={() => setPagina("editar")}>✏️ Editar Veículo</button>
                <button onClick={() => setPagina("excluir")}>❌ Excluir Veículo</button>
              </div>
            )}

            {/* Página LISTAR */}
            {pagina === "listar" && (
              <>
                <h2>📋 Lista de Veículos</h2>

                {/* Campo de busca */}
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
                      v.modelo.toLowerCase().includes(buscaListar.toLowerCase()) ||
                      v.placa.toLowerCase().includes(buscaListar.toLowerCase())
                  )}                 // <-- prop: envia a lista filtrada
                  setVeiculos={setVeiculos} // <-- prop: permite excluir dentro da lista
                  onExcluir={excluirVeiculo} // <-- prop: função p/ deletar
                />

                <button className="voltar" onClick={() => setPagina("menu")}>
                  Voltar
                </button>
              </>
            )}

            {/* Página ADICIONAR */}
            {pagina === "adicionar" && (
              <>
                <AddVeiculo
                  onAdicionar={adicionarVeiculo} // <-- prop: função que salva o veículo
                  mensagem={mensagem} // props só para exibir mensagens dentro do próprio componente
                  erro={erro}
                />

                <button className="voltar" onClick={() => setPagina("menu")}>
                  Voltar
                </button>
              </>
            )}

            {/* Página EDITAR */}
            {pagina === "editar" && (
              <>
                {/* Se nenhum veículo foi escolhido para editar → mostra lista */}
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
                          v.modelo.toLowerCase().includes(buscaEditar.toLowerCase()) ||
                          v.placa.toLowerCase().includes(buscaEditar.toLowerCase())
                      )
                      .map((v) => (
                        <div key={v.id} className="lista-item">
                          {v.modelo} - {v.placa}
                          <button onClick={() => setEditando(v)}>Editar</button>
                          {/* setEditando(v) envia o veículo atual para editação */}
                        </div>
                      ))}

                    <button className="voltar" onClick={() => setPagina("menu")}>
                      Voltar
                    </button>
                  </>
                ) : (
                  // Se já escolheu o veículo, exibe o formulário de edição
                  <EditarVeiculo
                    veiculo={editando}       // <-- PROP: veículo selecionado
                    onSalvar={salvarEdicao}  // <-- PROP: função que salva no backend
                    onCancelar={() => setEditando(null)} // cancela edição
                    mensagem={mensagem}
                    erro={erro}
                  />
                )}
              </>
            )}

            {/* Página EXCLUIR */}
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
                      v.modelo.toLowerCase().includes(buscaExcluir.toLowerCase()) ||
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
