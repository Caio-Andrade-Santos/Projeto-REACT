import { useState } from "react";

function EditarVeiculo({ veiculo, onSalvar, onCancelar }) {
  const [modelo, setModelo] = useState(veiculo.modelo);
  const [placa, setPlaca] = useState(veiculo.placa);

  const salvar = () => {
    if (!modelo || !placa) {
      alert("Preencha todos os campos!");
      return;
    }
    onSalvar({ ...veiculo, modelo, placa });
  };

  return (
    <div style={{ marginTop: 20 }}>
      <h3 style={{color : "white"}}>✏️ Editar Veículo</h3>
      <input
        type="text"
        value={modelo}
        onChange={(e) => setModelo(e.target.value)}
        placeholder="Modelo"
      />
      <input
        type="text"
        value={placa}
        onChange={(e) => setPlaca(e.target.value)}
        placeholder="Placa"
      />
      <button onClick={salvar}>Salvar</button>
      <button onClick={onCancelar} style={{ marginLeft: 10 }}>
        Cancelar
      </button>
    </div>
  );
}

export default EditarVeiculo;
