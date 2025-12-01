// Importa módulos
const express = require("express");
const fs = require("fs");
const app = express();
const cors = require("cors");
app.use(cors());
app.use(express.json());

// Função auxiliar: garante que o arquivo data.json exista e tenha formato correto
function carregarDados() {
  try {
    const conteudo = fs.readFileSync("data.json", "utf8");
    if (!conteudo.trim()) return { registros: [] };
    const dados = JSON.parse(conteudo);
    if (!dados.registros || !Array.isArray(dados.registros))
      return { registros: [] };
    return dados;
  } catch (err) {
    return { registros: [] };
  }
}

// Função auxiliar: salva o arquivo JSON
function salvarDados(dados) {
  fs.writeFileSync("data.json", JSON.stringify(dados, null, 2));
}

// Função auxiliar: gera ID automaticamente
function gerarId(dados) {
  if (dados.registros.length === 0) return 1;
  const maior = Math.max(...dados.registros.map((v) => v.id || 0));
  return maior + 1;
}

// Função auxiliar: valida placa (formato ABC-1234)
function validarPlaca(placa) {
  const regex = /^[A-Z]{3}-\d{4}$/i;
  return regex.test(placa);
}

// ---------------------- ROTAS ----------------------

// POST /add → adiciona novo veículo
app.post("/add", (req, res) => {
  let { modelo, placa, tipo, ano } = req.body;

  // Evita crash caso venha número no modelo/tipo/placa
  modelo = (modelo ?? "").toString().trim();
  placa = (placa ?? "").toString().trim();
  tipo = (tipo ?? "").toString().trim();

  // Validação inicial
  if (
    !modelo ||
    !placa ||
    !tipo ||
    ano === "" ||
    ano === undefined ||
    ano === null
  ) {
    return res
      .status(400)
      .json({ mensagem: "Preencha todos os campos corretamente!" });
  }

  ano = parseInt(ano);

  if (isNaN(ano)) {
    return res.status(400).json({ mensagem: "Ano inválido." });
  }

  if (!validarPlaca(placa)) {
    return res
      .status(400)
      .json({ mensagem: "Formato de placa inválido! Use ABC-1234." });
  }

  const dados = carregarDados();
  const novoId = gerarId(dados);
  const novoVeiculo = { id: novoId, modelo, placa, tipo, ano };

  dados.registros.push(novoVeiculo);
  salvarDados(dados);

  res.json({ mensagem: "Veículo salvo com sucesso!", veiculo: novoVeiculo });
});

// PUT /editar/:id → atualiza um veículo pelo id
app.put("/editar/:id", (req, res) => {
  const id = parseInt(req.params.id);
  let { modelo, placa, tipo, ano } = req.body;

  modelo = (modelo ?? "").toString().trim();
  placa = (placa ?? "").toString().trim();
  tipo = (tipo ?? "").toString().trim();

  if (
    !modelo ||
    !placa ||
    !tipo ||
    ano === "" ||
    ano === undefined ||
    ano === null
  ) {
    return res
      .status(400)
      .json({ mensagem: "Preencha todos os campos corretamente!" });
  }

  ano = parseInt(ano);

  if (isNaN(ano)) {
    return res.status(400).json({ mensagem: "Ano inválido." });
  }

  if (!validarPlaca(placa)) {
    return res
      .status(400)
      .json({ mensagem: "Formato de placa inválido! Use ABC-1234." });
  }

  const dados = carregarDados();
  const index = dados.registros.findIndex((v) => v.id === id);

  if (index !== -1) {
    dados.registros[index] = { id, modelo, placa, tipo, ano };
    salvarDados(dados);
    return res.json({
      mensagem: "Veículo atualizado com sucesso!",
      veiculo: dados.registros[index],
    });
  } else {
    return res.status(404).json({ mensagem: "Veículo não encontrado." });
  }
});

// GET /listar → lista todos os veículos
app.get("/listar", (req, res) => {
  const dados = carregarDados();
  res.json(dados.registros);
});

// DELETE /excluir/:id → remove um veículo pelo id
app.delete("/excluir/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const dados = carregarDados();

  const novosRegistros = dados.registros.filter((v) => v.id !== id);
  if (novosRegistros.length === dados.registros.length) {
    return res.status(404).json({ mensagem: "Veículo não encontrado." });
  }

  dados.registros = novosRegistros;
  salvarDados(dados);
  res.json({ mensagem: "Veículo removido com sucesso!" });
});

// ---------------------- SERVIDOR ----------------------
const PORT = 3001;
app.listen(PORT, () => {
  console.log("Servidor iniciado na porta " + PORT);
});
