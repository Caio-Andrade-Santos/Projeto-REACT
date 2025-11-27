import { useState } from "react";
import Veiculo from "../classes/veiculo";

// 🔍 Função para validar placa padrão antigo e Mercosul
function validarPlaca(placa) {
  if (!placa) return false;

  const p = placa.toUpperCase().trim();

  // Antiga: ABC-1234 ou ABC1234
  const regexAntiga = /^[A-Z]{3}-?\d{4}$/;

  // Mercosul: ABC1D23
  const regexMercosul = /^[A-Z]{3}\d[A-Z]\d{2}$/;

  return regexAntiga.test(p) || regexMercosul.test(p);
}

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

    // ❌ PLACA INVÁLIDA → BLOQUEIA!
    if (!validarPlaca(placa)) {
      setErro(true);
      setMensagem("Placa inválida! Use o padrão ABC-1234 ou ABC1D23.");
      setTimeout(() => setMensagem(""), 3000);
      return;
    }

    // Criar veículo APENAS se estiver tudo válido
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
    <div className="add-container animar-container">
      <h2 className="add-titulo">Adicionar Veículo</h2>

      <input
        type="text"
        className="add-input"
        placeholder="Modelo (obrigatório)"
        value={modelo}
        onChange={(e) => setModelo(e.target.value)}
      />

      <input
        type="text"
        className="add-input"
        placeholder="Placa (obrigatório)"
        value={placa}
        onChange={(e) => setPlaca(e.target.value.toUpperCase())}
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
        <p className={`${erro ? "add-erro" : "add-sucesso"} animar-msg`}>
          {mensagem}
        </p>
      )}
    </div>
  );
}

export default AddVeiculo;
