import "./App.css";
import { useState } from "react";
import AddVeiculo from "./components/AddVeiculo";
import ListaVeiculos from "./components/ListaVeiculos";
import EditarVeiculo from "./components/EditarVeiculo";

function App() {
  const [veiculos, setVeiculos] = useState([
    { id: 1, modelo: "Caminhão Baú", placa: "ABC-1234" },
    { id: 2, modelo: "Carreta", placa: "XYZ-5678" },
  ]);

  const [pagina, setPagina] = useState("menu");
  const [editando, setEditando] = useState(null);

  const salvarEdicao = (veiculoAtualizado) => {
    setVeiculos(
      veiculos.map((v) =>
        v.id === veiculoAtualizado.id ? veiculoAtualizado : v
      )
    );
    setEditando(null);
    setPagina("menu");
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>🚚 Sistema de Gerenciamento de Frota</h1>

      {pagina === "menu" && (
        <div className="menu">
          <button onClick={() => setPagina("listar")}>
            📋 Listar Veículos
          </button>
          <button onClick={() => setPagina("adicionar")}>
            ➕ Adicionar Veículo
          </button>
          <button onClick={() => setPagina("editar")}>✏️ Editar Veículo</button>
          <button onClick={() => setPagina("excluir")}>
            ❌ Excluir Veículo
          </button>
        </div>
      )}

      {pagina === "listar" && (
        <>
          <div className="lista-veiculos">
            <ListaVeiculos veiculos={veiculos} setVeiculos={setVeiculos} />
          </div>
          <button className="voltar" onClick={() => setPagina("menu")}>
            ⬅️ Voltar ao Menu
          </button>
        </>
      )}

      {pagina === "adicionar" && (
        <>
          <div className="lista-veiculos">
            <AddVeiculo veiculos={veiculos} setVeiculos={setVeiculos} />
          </div>
          <button className="voltar" onClick={() => setPagina("menu")}>
            ⬅️ Voltar ao Menu
          </button>
        </>
      )}

      {pagina === "editar" && (
        <>
          <div className="lista-veiculos">
            {!editando ? (
              <>
                <h2 style={{color : "white"}}>Selecione um veículo para editar:</h2>
                {veiculos.map((v) => (
                  <div style={{backgroundColor : "white"}} key={v.id} className="lista-item">
                    {v.modelo} - {v.placa}
                    <button
                      style={{ marginLeft: "10px", backgroundColor: "#1976d2" }}
                      onClick={() => setEditando(v)}
                    >
                      Editar
                    </button>
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
          </div>
          <button className="voltar" onClick={() => setPagina("menu")}>
            ⬅️ Voltar ao Menu
          </button>
        </>
      )}

      {pagina === "excluir" && (
        <>
          <div className="lista-veiculos">
            <ListaVeiculos veiculos={veiculos} setVeiculos={setVeiculos} />
          </div>
          <button className="voltar" onClick={() => setPagina("menu")}>
            ⬅️ Voltar ao Menu
          </button>
        </>
      )}
    </div>
  );
}

export default App;
