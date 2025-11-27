import { useState } from "react";

function AddVeiculo({ onAdicionar, mensagem, erro }) {
  const [modelo, setModelo] = useState("");
  const [placa, setPlaca] = useState("");
  const [tipo, setTipo] = useState("");
  const [ano, setAno] = useState("");

<<<<<<< Updated upstream
  const [mensagem, setMensagem] = useState(""); // <-- ADICIONADO

  const adicionar = () => {
    const novo = new Veiculo(
      modelo || undefined,
      placa || undefined,
      tipo || undefined,
      ano || undefined
    );
=======
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
>>>>>>> Stashed changes

    const placaFormatada = formatarPlaca(placa);
    const placaRegex = /^[A-Z]{3}-\d{4}$/;
    if (!placaRegex.test(placaFormatada)) {
      onAdicionar(null, true, "Placa inválida! Use o formato ABC-1234.");
      return;
    }

<<<<<<< Updated upstream
    // --- MENSAGEM DE SUCESSO ---
    setMensagem("Veículo adicionado com sucesso!");
    setTimeout(() => setMensagem(""), 3000);
    // ----------------------------
=======
    const novoVeiculo = {
      modelo: modelo.trim(),
      placa: placaFormatada,
      tipo: tipo.trim(),
      ano: anoNum,
    };

    onAdicionar(novoVeiculo);
>>>>>>> Stashed changes

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
<<<<<<< Updated upstream
=======
        className="add-input"
>>>>>>> Stashed changes
        placeholder="Modelo"
        value={modelo}
        onChange={(e) => setModelo(e.target.value)}
      />
      <input
        type="text"
<<<<<<< Updated upstream
        placeholder="Placa"
=======
        className="add-input"
        placeholder="Placa (ABC-1234)"
>>>>>>> Stashed changes
        value={placa}
        onChange={(e) => setPlaca(formatarPlaca(e.target.value))}
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
