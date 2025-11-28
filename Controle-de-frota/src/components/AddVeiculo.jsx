import { useState } from "react";

function AddVeiculo({ onAdicionar, mensagem, erro }) {
  const [modelo, setModelo] = useState("");
  const [placa, setPlaca] = useState("");
  const [tipo, setTipo] = useState("");
  const [ano, setAno] = useState("");

  // Função para formatar placa automaticamente
  const formatarPlaca = (valor) => {
    let p = valor.toUpperCase().replace(/[^A-Z0-9]/g, "");
    if (p.length > 3) p = p.slice(0, 3) + "-" + p.slice(3, 7);
    return p;
  };

  const adicionar = () => {
    // Trim e validação básica
    if (!modelo.trim() || !placa.trim() || !tipo.trim() || !ano) {
      onAdicionar(null, true, "Preencha todos os campos obrigatórios!");
      return;
    }

    const anoNum = parseInt(ano);
    if (isNaN(anoNum) || anoNum < 1900 || anoNum > new Date().getFullYear()) {
      onAdicionar(null, true, "Ano inválido!");
      return;
    }

    const placaFormatada = formatarPlaca(placa);
    const placaRegex = /^[A-Z]{3}-\d{4}$/;
    if (!placaRegex.test(placaFormatada)) {
      onAdicionar(null, true, "Placa inválida! Use o formato ABC-1234.");
      return;
    }

    const novoVeiculo = {
      modelo: modelo.trim(),
      placa: placaFormatada,
      tipo: tipo.trim(),
      ano: anoNum,
    };

    onAdicionar(novoVeiculo);

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
        placeholder="Modelo"
        value={modelo}
        onChange={(e) => setModelo(e.target.value)}
      />
      <input
        type="text"
        className="add-input"
        placeholder="Placa (ABC-1234)"
        value={placa}
        onChange={(e) => setPlaca(formatarPlaca(e.target.value))}
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
