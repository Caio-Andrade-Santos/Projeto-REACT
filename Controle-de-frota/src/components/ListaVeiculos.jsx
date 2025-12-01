import React, { useState } from "react";

// O componente recebe dois props vindos do componente pai (App):
// veiculos → a lista atual de veículos cadastrados
// setVeiculos → função que atualiza essa lista
function ListaVeiculos({ veiculos, setVeiculos }) {

  // Estado para mostrar mensagens (sucesso/erro)
  const [mensagem, setMensagem] = useState("");

  // Estado para controlar se a mensagem é erro ou sucesso
  const [erro, setErro] = useState(false);

  // Função chamada quando o usuário clica no botão "Excluir"
  const remover = async (id) => {

    // Exibe uma caixa de confirmação
    const confirmar = window.confirm(
      "Tem certeza que deseja excluir este veículo?"
    );
    if (!confirmar) return; // Se cancelar, sai da função

    try {
      // Envia a requisição ao backend para excluir o veículo
      const response = await fetch(`http://localhost:3001/excluir/${id}`, {
        method: "DELETE",
      });

      // A resposta do backend (JSON)
      const data = await response.json();

      // Se a exclusão funcionou:
      if (response.ok) {
        // Remove o veículo da lista no estado local
        // Aqui ocorre o RE-RENDER da lista
        setVeiculos(veiculos.filter((v) => v.id !== id));
        setErro(false);
        setMensagem(data.mensagem || "Veículo removido com sucesso!");
      } else {
        // Se deu erro no backend
        setErro(true);
        setMensagem(data.mensagem || "Erro ao tentar remover o veículo.");
      }
    } catch (error) {
      // Se deu erro no fetch
      console.error("Erro ao excluir veículo:", error);
      setErro(true);
      setMensagem("Ocorreu um erro ao tentar excluir o veículo.");
    }

    // A mensagem some após 3 segundos
    setTimeout(() => setMensagem(""), 3000);
  };

  return (
    <div>
      {/* 
        Aqui ocorre a "magia":
        veiculos.map percorre todos os veículos recebidos como props.
        COMO ELE ACESSA OS VEÍCULOS?
        Porque o componente pai (App.jsx) passou esses dados por props.
      */}
      {veiculos.map((v) => (
        <div
          key={v.id} 
          className="lista-item_ListaVeiculos"
          style={{
            margin: "10px 0",
            padding: "10px",
            borderRadius: "8px",
            color: "white",
          }}
        >
          {/* Mostra os dados do veículo */}
          <p>
            <b>Modelo:</b> {v.modelo} <br />
            <b>Placa:</b> {v.placa} <br />
            <b>Tipo:</b> {v.tipo} <br />
            <b>Ano:</b> {v.ano}
          </p>

          {/* Botão que dispara a função remover */}
          <button onClick={() => remover(v.id)}>Excluir</button>
        </div>
      ))}

      {/* Mensagem visual de erro ou sucesso */}
      {mensagem && (
        <p className={`${erro ? "add-erro" : "add-sucesso"} animar-msg`}>
          {mensagem}
        </p>
      )}
    </div>
  );
}

export default ListaVeiculos;
