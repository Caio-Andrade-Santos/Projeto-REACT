function ListaVeiculos({ veiculos, setVeiculos }) {
  const remover = (id) => {
    if (window.confirm("Tem certeza que deseja excluir este veículo?")) {
      setVeiculos(veiculos.filter((v) => v.id !== id));
    }
  };

  return (
    <div>
      <h2 style={{ color: "white" }}>📋 Lista de Veículos</h2>
      {veiculos.map((v) => (
        <div
          key={v.id}
          style={{
            background: "#e8e8e8",
            margin: "10px 0",
            padding: "10px",
            borderRadius: "8px",
          }}
        >
          <p>
            <b>Modelo:</b> {v.modelo} <br />
            <b>Placa:</b> {v.placa}
          </p>
          <button onClick={() => remover(v.id)}>❌ Excluir</button>
        </div>
      ))}
    </div>
  );
}

export default ListaVeiculos;
