// Importa módulos
const express = require("express");
const fs = require("fs");
const app = express();

// Middleware para permitir JSON no body
app.use(express.json());

// ---------------------- ROTAS ----------------------

// POST /add → adiciona novo veículo
app.post("/add", (req, res) => {
  const novoItem = req.body;

  let dados = JSON.parse(fs.readFileSync("data.json", "utf8"));

  // Garante um id único
  const novoId =
    dados.registros.length > 0
      ? Math.max(...dados.registros.map((v) => v.id)) + 1
      : 1;
  novoItem.id = novoId;

  dados.registros.push(novoItem);
  fs.writeFileSync("data.json", JSON.stringify(dados, null, 2));

  res.json({ mensagem: "Item salvo com sucesso!", id: novoId });
});

// GET /listar → lista todos os veículos
app.get("/listar", (req, res) => {
  const dados = JSON.parse(fs.readFileSync("data.json", "utf8"));
  res.json(dados.registros);
});

// PUT /editar/:id → atualiza um veículo pelo id
app.put("/editar/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const veiculoAtualizado = req.body;

  let dados = JSON.parse(fs.readFileSync("data.json", "utf8"));

  const index = dados.registros.findIndex((v) => v.id === id);
  if (index !== -1) {
    dados.registros[index] = { id, ...veiculoAtualizado };
    fs.writeFileSync("data.json", JSON.stringify(dados, null, 2));
    res.json({ mensagem: "Veículo atualizado com sucesso!" });
  } else {
    res.status(404).json({ mensagem: "Veículo não encontrado." });
  }
});

// DELETE /excluir/:id → remove um veículo pelo id
app.delete("/excluir/:id", (req, res) => {
  const id = parseInt(req.params.id);

  let dados = JSON.parse(fs.readFileSync("data.json", "utf8"));

  const novosRegistros = dados.registros.filter((v) => v.id !== id);

  if (novosRegistros.length === dados.registros.length) {
    return res.status(404).json({ mensagem: "Veículo não encontrado." });
  }

  dados.registros = novosRegistros;
  fs.writeFileSync("data.json", JSON.stringify(dados, null, 2));
  res.json({ mensagem: "Veículo removido com sucesso!" });
});

// ---------------------- SERVIDOR ----------------------
const PORT = 3001;
app.listen(PORT, () => {
  console.log("Servidor iniciado na porta " + PORT);
});
