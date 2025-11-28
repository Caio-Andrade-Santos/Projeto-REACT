import { useState } from "react";

function EditarVeiculo({
  veiculo,
  onSalvar,
  onCancelar,
  mensagem,
  erro,
  loading,
}) {
  const [modelo, setModelo] = useState(veiculo.modelo);
  const [placa, setPlaca] = useState(veiculo.placa);
  const [tipo, setTipo] = useState(veiculo.tipo);
  const [ano, setAno] = useState(veiculo.ano);

  // Formata placa
  const formatarPlaca = (valor) => {
    let p = valor.toUpperCase().replace(/[^A-Z0-9]/g, "");
    if (p.length > 3) p = p.slice(0, 3) + "-" + p.slice(3, 7);
    return p;
  };

  const salvar = () => {
    if (!modelo.trim() || !placa.trim() || !tipo.trim() || !ano) {
      onSalvar(null, true, "Preencha todos os campos obrigatórios!");
      return;
    }

    const anoNum = parseInt(ano);
    if (isNaN(anoNum) || anoNum < 1900 || anoNum > new Date().getFullYear()) {
      onSalvar(null, true, "Ano inválido!");
      return;
    }

    const placaFormatada = formatarPlaca(placa);
    const placaRegex = /^[A-Z]{3}-\d{4}$/;
    if (!placaRegex.test(placaFormatada)) {
      onSalvar(null, true, "Placa inválida! Use o formato ABC-1234.");
      return;
    }

    const atualizado = {
      ...veiculo,
      modelo: modelo.trim(),
      placa: placaFormatada,
      tipo: tipo.trim(),
      ano: anoNum,
    };

    onSalvar(atualizado);
  };

  return (
    <div className="add-container">
      <h3 style={{ color: "white" }}>✏️ Editar Veículo</h3>

      <input
        className="add-input"
        type="text"
        placeholder="Modelo"
        value={modelo}
        onChange={(e) => setModelo(e.target.value)}
      />
      <input
        className="add-input"
        type="text"
        placeholder="Placa (ABC-1234)"
        value={placa}
        onChange={(e) => setPlaca(formatarPlaca(e.target.value))}
      />
      <input
        className="add-input"
        type="text"
        placeholder="Tipo"
        value={tipo}
        onChange={(e) => setTipo(e.target.value)}
      />
      <input
        className="add-input"
        type="number"
        placeholder="Ano"
        value={ano}
        onChange={(e) => setAno(e.target.value)}
      />

      <button className="add-botao" onClick={salvar} disabled={loading}>
        {loading ? "Salvando..." : "Salvar"}
      </button>
      <button
        onClick={onCancelar}
        className="add-botao"
        style={{ backgroundColor: "rgb(255, 145, 77)" }}
        disabled={loading}
      >
        Cancelar
      </button>

      {mensagem && (
        <p className={`${erro ? "add-erro" : "add-sucesso"} animar-msg`}>
          {mensagem}
        </p>
      )}
    </div>
  );
}

export default EditarVeiculo;
