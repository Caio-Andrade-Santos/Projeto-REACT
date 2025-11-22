import { redirect } from "react-router-dom";

function ListaVeiculos({ veiculos, setVeiculos }) {
  const remover = (id) => {
    if (window.confirm("Tem certeza que deseja excluir este veículo?")) {
      setVeiculos(veiculos.filter((v) => v.id !== id));
    }
  };

  return (
    <div>
      <h2 className="lista-item">📋 Lista de Veículos</h2>
      {veiculos.map((v) => (
        <div className="lista-item"
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
            <b>Placa:</b> {v.placa}
          </p>
          <button style={{backgroundColor:"red"}} onClick={() => remover(v.id)}>Excluir</button>
        </div>
      ))}
    </div>
  );
}

export default ListaVeiculos;
