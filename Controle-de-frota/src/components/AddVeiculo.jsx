import { useState } from "react";

function AddVeiculo({ onAdicionar, mensagem, erro }) {
  // Estados para armazenar os valores dos campos do formulário
  const [modelo, setModelo] = useState("");
  const [placa, setPlaca] = useState("");
  const [tipo, setTipo] = useState("");
  const [ano, setAno] = useState("");

  // Função para formatar a placa automaticamente no padrão ABC-1234
  const formatarPlaca = (valor) => {
    let p = valor.toUpperCase().replace(/[^A-Z0-9]/g, ""); // Remove caracteres inválidos
    if (p.length > 3) p = p.slice(0, 3) + "-" + p.slice(3, 7); // Insere o hífen
    return p;
  };

  // Função chamada quando o usuário clica no botão "Adicionar"
  const adicionar = () => {
    // Verifica se todos os campos foram preenchidos
    if (!modelo.trim() || !placa.trim() || !tipo.trim() || !ano) {
      onAdicionar(null, "Preencha todos os campos obrigatórios!", true);
      return;
    }

    // Validação do ano do veículo
    const anoNum = parseInt(ano);
    if (isNaN(anoNum) || anoNum < 1900 || anoNum > new Date().getFullYear()) {
      onAdicionar(null, "Ano inválido!", true);
      return;
    }

    // Validação da placa formatada
    const placaFormatada = formatarPlaca(placa);
    const placaRegex = /^[A-Z]{3}-\d{4}$/; // Regex para validar padrão ABC-1234
    if (!placaRegex.test(placaFormatada)) {
      onAdicionar(null, "Placa inválida! Use o formato ABC-1234.", true);
      return;
    }

    // Criação do objeto com os dados do novo veículo
    const novoVeiculo = {
      modelo: modelo.trim(),
      placa: placaFormatada,
      tipo: tipo.trim(),
      ano: anoNum,
    };

    // Chama a função recebida via props, enviando o veículo criado
    onAdicionar(novoVeiculo);

    // Limpa os campos após adicionar
    setModelo("");
    setPlaca("");
    setTipo("");
    setAno("");
  };

  return (
    <div className="add-container animar-container">
      {/* Título do formulário */}
      <h2 className="add-titulo">Adicionar Veículo</h2>

      {/* Campo para o modelo do veículo */}
      <input
        type="text"
        className="add-input"
        placeholder="Modelo"
        value={modelo}
        onChange={(e) => setModelo(e.target.value)}
      />

      {/* Campo da placa, formatado automaticamente */}
      <input
        type="text"
        className="add-input"
        placeholder="Placa (ABC-1234)"
        value={placa}
        onChange={(e) => setPlaca(formatarPlaca(e.target.value))}
      />

      {/* Campo para o tipo do veículo */}
      <input
        type="text"
        className="add-input"
        placeholder="Tipo"
        value={tipo}
        onChange={(e) => setTipo(e.target.value)}
      />

      {/* Campo para o ano */}
      <input
        type="number"
        className="add-input"
        placeholder="Ano"
        value={ano}
        onChange={(e) => setAno(e.target.value)}
      />

      {/* Botão para adicionar o veículo */}
      <button className="add-botao" onClick={adicionar}>
        Adicionar
      </button>

      {/* Mensagem de erro ou sucesso */}
      {mensagem && (
        <p className={`${erro ? "add-erro" : "add-sucesso"} animar-msg`}>
          {mensagem}
        </p>
      )}
    </div>
  );
}

export default AddVeiculo;