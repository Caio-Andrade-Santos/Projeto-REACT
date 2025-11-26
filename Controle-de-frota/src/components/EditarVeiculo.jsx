import { useState } from "react";

function EditarVeiculo({ veiculo, onSalvar, onCancelar }) {
  const [modelo, setModelo] = useState(veiculo.modelo);
  const [placa, setPlaca] = useState(veiculo.placa);
  const [tipo, setTipo] = useState(veiculo.tipo);
  const [ano, setAno] = useState(veiculo.ano);

  const salvar = () => {
    if (!modelo || !placa || !tipo || !ano) {
      alert("Preencha todos os campos!");
      return;
    }
    onSalvar({ ...veiculo, modelo, placa, tipo, ano });
  };

  return (
    <div className="add-container">
      <h3 style={{color : "white"}}>✏️ Editar Veículo</h3>
      <input className="add-input"
        type="text"
        value={modelo}
        onChange={(e) => setModelo(e.target.value)}
        placeholder="Modelo"
      />
      <input className="add-input"
        type="text"
        value={placa}
        onChange={(e) => setPlaca(e.target.value)}
        placeholder="Placa"
      />
       <input className="add-input"
        type="text"
        value={tipo}
        onChange={(e) => setTipo(e.target.value)}
        placeholder="Tipo"
      />
       <input className="add-input"
        type="text"
        value={ano}
        onChange={(e) => setAno(e.target.value)}
        placeholder="Ano"
      />
      <button onClick={salvar} className="add-botao">Salvar</button>
      <button onClick={onCancelar} className="add-botao" style={{backgroundColor: "rgb(255, 145, 77)"}}>
        Cancelar
      </button>
    </div>
  );
}

export default EditarVeiculo;
