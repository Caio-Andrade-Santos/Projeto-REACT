import "./App.css";
import { useState } from "react";
import AddVeiculo from "./components/AddVeiculo";
import ListaVeiculos from "./components/ListaVeiculos";
import EditarVeiculo from "./components/EditarVeiculo";

export default function App() {
  const [veiculos, setVeiculos] = useState([
    { id: 1, modelo: "Caminhão Baú", placa: "ABC-1234" },
    { id: 2, modelo: "Carreta", placa: "XYZ-5678" },
  ]);

  const [pagina, setPagina] = useState("menu");
  const [editando, setEditando] = useState(null);

  function salvarEdicao(veiculoAtualizado) {
    setVeiculos(
      veiculos.map((v) =>
        v.id === veiculoAtualizado.id ? veiculoAtualizado : v
      )
    );
    setEditando(null);
    setPagina("menu");
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>Sistema de Gerenciamento de Frota</h1>

      {/* Menu principal */}
      {pagina === "menu" && (
        <div className="menu">
          <button onClick={() => setPagina("listar")}>📋 Listar Veículos</button>
          <button onClick={() => setPagina("adicionar")}>➕ Adicionar Veículo</button>
          <button onClick={() => setPagina("editar")}>✏️ Editar Veículo</button>
          <button onClick={() => setPagina("excluir")}>❌ Excluir Veículo</button>
        </div>
      )}

      {/* Listar Veículos */}
      {pagina === "listar" && (
        <>
          <ListaVeiculos veiculos={veiculos} setVeiculos={setVeiculos} />
          <button className="voltar" onClick={() => setPagina("menu")}>
            ⬅️ Voltar
          </button>
        </>
      )}

      {/* Adicionar Veículo */}
      {pagina === "adicionar" && (
        <>
          <AddVeiculo veiculos={veiculos} setVeiculos={setVeiculos} />
          <button className="voltar" onClick={() => setPagina("menu")}>
            ⬅️ Voltar
          </button>
        </>
      )}

      {/* Editar Veículo */}
      {pagina === "editar" && (
        <>
          {!editando ? (
            <>
              <h2>Selecione um veículo para editar:</h2>
              {veiculos.map((v) => (
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
            ⬅️ Voltar
          </button>
        </>
      )}

      {/* Excluir */}
      {pagina === "excluir" && (
        <>
          <ListaVeiculos veiculos={veiculos} setVeiculos={setVeiculos} />
          <button className="voltar" onClick={() => setPagina("menu")}>
            ⬅️ Voltar
          </button>
        </>
      )}
    </div>
  );
}
