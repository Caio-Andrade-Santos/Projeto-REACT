import React from "react";

function ListaVeiculos({ veiculos, setVeiculos }) {
  const remover = (id) => {
    if (window.confirm("Tem certeza que deseja excluir este veículo?")) {
      setVeiculos(veiculos.filter((v) => v.id !== id));
    }
  };

  return (
    <div>
      <h2 className="lista-item_ListaVeiculos">📋 Lista de Veículos</h2>
      {veiculos.map((v) => (
        <div className="lista-item_ListaVeiculos"
          key={v.id}
          style={{
            margin: "10px 0",
            padding: "10px",
            borderRadius: "8px",
            color: "white",
          }}
        >
          <p>
            <b>Modelo:</b> {v.modelo} <br />
            <b>Placa:</b> {v.placa} <br />
            <b>Tipo:</b> {v.tipo} <br />
            <b>Ano:</b> {v.ano} 
          </p>
          <button  onClick={() => remover(v.id)}>Excluir</button>
        </div>
      ))}
    </div>
  );
}

export default ListaVeiculos;
