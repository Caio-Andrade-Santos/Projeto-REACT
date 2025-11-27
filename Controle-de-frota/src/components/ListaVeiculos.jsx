<<<<<<< Updated upstream
=======
import React, { useState } from "react";

>>>>>>> Stashed changes
function ListaVeiculos({ veiculos, setVeiculos }) {
  const [mensagem, setMensagem] = useState("");
  const [erro, setErro] = useState(false);

  const remover = async (id) => {
    // Confirmação de exclusão
    const confirmar = window.confirm(
      "Tem certeza que deseja excluir este veículo?"
    );
    if (!confirmar) return;

    try {
      const response = await fetch(`http://localhost:3001/excluir/${id}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (response.ok) {
        setVeiculos(veiculos.filter((v) => v.id !== id));
        setErro(false);
        setMensagem(data.mensagem || "Veículo removido com sucesso!");
      } else {
        setErro(true);
        setMensagem(data.mensagem || "Erro ao tentar remover o veículo.");
      }
    } catch (error) {
      console.error("Erro ao excluir veículo:", error);
      setErro(true);
      setMensagem("Ocorreu um erro ao tentar excluir o veículo.");
    }

    // Limpa a mensagem depois de 3 segundos
    setTimeout(() => setMensagem(""), 3000);
  };

  return (
    <div>
      <h2 style={{ color: "white" }}>📋 Lista de Veículos</h2>
      {veiculos.map((v) => (
        <div
          key={v.id}
          className="lista-item_ListaVeiculos"
          style={{
            background: "#e8e8e8",
            margin: "10px 0",
            padding: "10px",
            borderRadius: "8px",
          }}
        >
          <p>
            <b>Modelo:</b> {v.modelo} <br />
<<<<<<< Updated upstream
            <b>Placa:</b> {v.placa}
          </p>
          <button onClick={() => remover(v.id)}>❌ Excluir</button>
=======
            <b>Placa:</b> {v.placa} <br />
            <b>Tipo:</b> {v.tipo} <br />
            <b>Ano:</b> {v.ano}
          </p>
          <button onClick={() => remover(v.id)}>Excluir</button>
>>>>>>> Stashed changes
        </div>
      ))}

      {mensagem && (
        <p className={`${erro ? "add-erro" : "add-sucesso"} animar-msg`}>
          {mensagem}
        </p>
      )}
    </div>
  );
}

export default ListaVeiculos;
