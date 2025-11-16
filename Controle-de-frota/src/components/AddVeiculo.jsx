import { useState } from "react";
import Veiculo from "../classes/veiculo";

function AddVeiculo({ veiculos, setVeiculos }) {
  const [modelo, setModelo] = useState("");
  const [placa, setPlaca] = useState("");
  const [tipo, setTipo] = useState("");
  const [ano, setAno] = useState("");

  const [mensagem, setMensagem] = useState(""); // <-- ADICIONADO

  const adicionar = () => {
    const novo = new Veiculo(
      modelo || undefined,
      placa || undefined,
      tipo || undefined,
      ano || undefined
    );

    setVeiculos([...veiculos, novo]);

    // --- MENSAGEM DE SUCESSO ---
    setMensagem("Veículo adicionado com sucesso!");
    setTimeout(() => setMensagem(""), 3000);
    // ----------------------------

    setModelo("");
    setPlaca("");
    setTipo("");
    setAno("");
  };

  return (
    <div>
      <h2 style={{color : "white"}}>Adicionar Veículo</h2>

      <input
        type="text"
        placeholder="Modelo"
        value={modelo}
        onChange={(e) => setModelo(e.target.value)}
      />

      <input
        type="text"
        placeholder="Placa"
        value={placa}
        onChange={(e) => setPlaca(e.target.value)}
      />

      <input
        type="text"
        placeholder="Tipo"
        value={tipo}
        onChange={(e) => setTipo(e.target.value)}
      />

      <input
        type="number"
        placeholder="Ano"
        value={ano}
        onChange={(e) => setAno(e.target.value)}
      />

      <button onClick={adicionar}>Adicionar</button>

      {/* EXIBE A MENSAGEM */}
      {mensagem && (
        <p style={{ color: "white", marginTop: "10px" }}>{mensagem}</p>
      )}
    </div>
  );
}

export default AddVeiculo;
