import { useState } from "react";
import Veiculo from "../classes/veiculo";

function AddVeiculo({ veiculos, setVeiculos }) {
  const [modelo, setModelo] = useState("");
  const [placa, setPlaca] = useState("");
  const [tipo, setTipo] = useState("");
  const [ano, setAno] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [erro, setErro] = useState(false); 

  const adicionar = () => {
    if (!modelo || !placa) {
      setErro(true);
      setMensagem("Preencha todos os campos obrigatórios!");
      setTimeout(() => setMensagem(""), 3000);
      return;
    }

    const novo = new Veiculo(
      modelo || undefined,
      placa || undefined,
      tipo || undefined,
      ano || undefined
    );

    setVeiculos([...veiculos, novo]);

    setErro(false);
    setMensagem("Veículo adicionado com sucesso!");
    setTimeout(() => setMensagem(""), 3000);

    setModelo("");
    setPlaca("");
    setTipo("");
    setAno("");
  };

  return (
    <div className="add-container">
      <h2 className="add-titulo">Adicionar Veículo</h2>

      <input
        type="text"
        className="add-input"
        placeholder="Modelo"
        value={modelo}
        onChange={(e) => setModelo(e.target.value)}
      />

      <input
        type="text"
        className="add-input"
        placeholder="Placa (obrigatório)"
        value={placa}
        onChange={(e) => setPlaca(e.target.value)}
      />

      <input
        type="text"
        className="add-input"
        placeholder="Tipo"
        value={tipo}
        onChange={(e) => setTipo(e.target.value)}
      />

      <input
        type="number"
        className="add-input"
        placeholder="Ano"
        value={ano}
        onChange={(e) => setAno(e.target.value)}
      />

      <button className="add-botao" onClick={adicionar}>
        Adicionar
      </button>

      {mensagem && (
        <p className={erro ? "add-erro" : "add-sucesso"}>{mensagem}</p>
      )}
    </div>
  );
}

export default AddVeiculo;
