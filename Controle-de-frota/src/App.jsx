import "./App.css";
import { useState } from "react";
import Login from "./pages/login";
import AddVeiculo from "./components/AddVeiculo";
import ListaVeiculos from "./components/ListaVeiculos";
import EditarVeiculo from "./components/EditarVeiculo";
import Navbar from "./components/Navbar";

export default function App() {
  // Estados
  const [menuAberto, setMenuAberto] = useState(false);
  const [veiculos, setVeiculos] = useState([
    { id: 1, modelo: "Caminhão Baú", placa: "ABC-1234", tipo: "Carga", ano: 2020 },
    { id: 2, modelo: "Carreta", placa: "XYZ-5678", tipo: "Carga", ano: 2018 },
  ]);
  const [pagina, setPagina] = useState("menu");
  const [editando, setEditando] = useState(null);

  // Funções
  const toggleMenu = () => setMenuAberto(!menuAberto);

  function salvarEdicao(veiculoAtualizado) {
    setVeiculos(
      veiculos.map((v) =>
        v.id === veiculoAtualizado.id ? veiculoAtualizado : v
      )
    );
    setEditando(null);
    setPagina("menu");
  }

  // Usuário
  const usuario = {
    nome: "Admin",
    foto: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAJQAogMBIgACEQEDEQH/xAAbAAEAAgMBAQAAAAAAAAAAAAAAAQYCBAUDB//EAEEQAAEDAgMFBAYHBwMFAAAAAAEAAhEDBCExQQUSUWFxBiJCUhMygZGx0RQzU1RicqEjZKKjweHwgpLCJDRDRGP/xAAVAQEBAAAAAAAAAAAAAAAAAAAAAf/EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAMAwEAAhEDEQA/APspOJ3t0ujvRlHLmmrd3Pwk5Ac+aDDACIx3fJzQQQRG9vaefmgaA4xOE5g8+SHWf9UZn8qZ+KZw3vN+FMh5d3X7NA1MQHEeyPmgwiDGB3d7T8y09o7Qt9n0h6YAvOLKQOJ/EqvtDat1fEh7tymc2NwB68SgsN5tuytpYC6s4HJmPe65QuPc9orurvCi2nSB4DeP6rjQpQbNXaF5W+suqp5B0D9Frvc55l5LuJJlQiADBluBXtSu7ml9XXqs6PK8UQdSht++pFu+9lVo0e35Lq2faK2qwy4Y+idHTvCefL2KrIg+g06tOrT36bxUYcywzP5VnrGE/pHzVCtLy4s6oqW1UsdwzB6hWfZe26F4G06gFKqcmE90niD/AEQdXQRl4Z0/MmEYyWz7Z+SCes/zE1nexy3v+KBxnHzRr+VTjOkx7I+ajLiI/lpGkTruzn+JBj+z/eFKn0n71/CoQSDAbu70aTnPPkh1zie9Gc8uSTOLXB04b3n5ISBBJDQ3CR4OSBiCcRJGPCOXNczbG1mWFP0dPvVyO60+Hm7mvXa9+zZ9uTug1H/V0+B8yplWo+rUdUqOLnuMuccyUE1atStUNSq9z3uxLnZrBEQEREBEWdOhWq/V0nuHFrZQYIvZ9pcsxfb1WjiWFeKAiIgIiILDsTbRJFreu7pwbVOfT+6seIOm9Hsj5r52rN2d2n6Zos653ntxpzr7eI+CDujwwPyz/VMIjGJ9s/JMeTp/mfJT0OWG9w/Cgy/af/FFhufun8ShBliSYAnxRl7Oawc9tOmXuIDWgmXZRqXLLLIbsY7vk5ridp7v0Vs22pkg1sXHzNGvv+CDg7RvHX10+tiGkw0HQaLVREBERAXrbW9W6rNo0G7zz/kleRwCuOwbAWdmHuH7aqA5xOg0CDDZ+wra2aHVwK9U5lw7o6D5rqgACAIHAIiAtO+2XaXjT6SmGvP/AJGCHf3W4iCk7T2dV2fUh/epn1agGB5dVpK+3dtTu7d9GqMHDPgeKo1xRfb16lGp67HEHnzQeaIiApY91N4fTcWuaZBGhUIgvOzbxt/aCs3A5VAPCeS2tdJjDhHzVU7NXnoL00XuhlUYE6OGR+KtZ4bus7vH8SDGafGupWW+fvI/2ogjAhsExpOZPPkqXt2ubnadYnFrTuAcIw+Mq5Vagp0qlVxBDWkl3ngZL58STi7MmT1QEREBERBsbOpCvf29MiQ6oARyV7VI2O8M2pauP2ke/BXdAREQEREBVXtTS3L5lQD6xmPOMPkrUqz2td/1NszhTJ95/sg4SIiAiIglj3U3teww5pDgeiv1Cs2vQp1mg7jwDzk6dFQFcezlU1NlUsYLCWb3KcvcUHUir5KKLDcH3V3+5EGrtclmzbp0N3hSMjQdFR1dttCdlXIDTAZ6urVSTmgIiICIiCWuLHB7TDgRCvllcsu7WnXYcHjHkdQqEulsXajrCqWvG9Qee8BmOYQXFFhRqsr0xUovD2OyIWeaAiJOGkceCASACTkFSNrXQvL+pVb6nqs6BdTb22BUY60tHSDhUqA/oFX0BERAREQFZ+ybj9FrtGlSYOWXxVYVl7Jf9tcTiPSDu+zNB3ZZ9pXRZbzvvLfciDWv2Crs+4aCTvU3Bp1JjVURfQzxJBJGJ0fyCoN3RNvdVaJBG48gA6CcEHkiIgIiICItuy2bd3uNGl3dXuwag87W7r2ji63qOYTmBkeoXVpdpq4H7ahTedS0lsrYt+zVMAG5uHE6imIHvK3WbC2c3OiXfme5BzX9p3kdy1YDpvPXMvdqXd6C2tVin9mzBqs7th7Od/68dHu+a1a3Zu1cD6GrUpnmd4IKsi6V7sS8tZcGCtT81PP3Zrm/FAREQEREBWvsszd2a57hg+qYIzwj9M1VFeNk0fo2zrdmAcGSXdcSOuKDd3an2VFFh6Nn3Z/vRBlBxwAIzAybzCqvai23LplwB3KzYniRx5wrSAOBABwBzbzK09q2n02yqURjU9dn4nDIjkgpCIQQSHAggwRwRAQAucGgEuOQGqKz9ndlilTbeXDZqOE0wR6o49Sgx2TsFrA2vfgOdm2loOvFd5oDQAMIwwREEqERAREQFzNqbHoXwL2AUq/nAwd1H9V00QUG5t6trWfRrNLXtz59F5K7bW2czaFAtwbVbjTfw5dFS6jHU3uY9pa9phzTogxREQbOzbb6Xe06R9SZfHlGavcGYgAxMaRx6rh9l7L0NB108AVKmDD5W8T1XbwiIwz3dZ49EEb1P7Wqiz3nfeKShBGBAMkg4A6u5FCc5MAesR4eQU5kkuBJwLhk4cAoGhmIyJyZyKCtdptmllT6ZTZAd9a0acD7VwV9BextSmWPYCw5sd8TyVP2xst9hV3mY27j3XIMdi2f02+YxwmmzvP6cPerouN2WtxSsn1iO9Vd+gw+a7KAiIgIiICIiAiIgKt9qbKHtvKY9YhtSOOhVkWvtGgLqxrUSPWaY6jEIKIt7ZGz37QutyIpM71R3JeNjZ1r6uKNIQfE45NHFXSytKdnbtoUmmAZM+s4+YoPZrWtYxrAN2IYPN1U6SSQJgnUHh0TOZxnOPH0UzjnBiJ0A4dUE7tT7vSRYbjPsKnvRBlkSCACMSBk0cQo4CJJyB8XVMAAIIAxA1bzKHmJBzA8XMIEyMCSCYBOZ5HkoqMbUpvp1WgsIh4z3eQWRmcSCSMxkRw6pqIwj1Z8HVB5W9FlvSZQpN3WsEAZ4L0TlGHl1B49ExPMjHDxdEBEyEzh8CiAiIgIiICImn+YoCDPop04HifD1UaZGJnd1B49EHja2tG1ZuW9MBryXR5+q9pwmTExvazw6IcQZ70+tHj6KTMzImI3tI8vVBGUyIjOPB0TGYgExMcuPVNGxhHqz4OqRhBBImY1J83RBG/T+8P9yLPeqfb0VCCQM5JMHE8eqgY6wdCPD0UIgDXARoOB4qY448Z8XVEQCIGePHXp0Q5wMMcI8PRQiCYHs4aTx6pHdxJMHHn1REAqERAUhEQRo748FJ4wMsBoDxUIgDKTjx/F1WUczPHXooRBBykYcPw9FIjAwI4aTx6oiBGesZ/i6qDg2dePLh0UIgzhn2bPciIqP//Z",
  };

  return (
    <>
      {/* Navbar só aparece se não estiver na página de login */}
      {pagina !== "login" && (
        <Navbar
          user={usuario}
          menuAberto={menuAberto}
          toggleMenu={toggleMenu}
          setPagina={setPagina}
        />
      )}
      <div className="app-container">
        {pagina === "login" && (
          <Login onLoginSuccess={() => setPagina("menu")} />
        )}
        {pagina !== "login" && (
          <>
            <h1>Sistema de Gerenciamento de Frota</h1>

            {/* Menu principal */}
            {pagina === "menu" && (
              <>
                <div className="menu">
                  <button onClick={() => setPagina("listar")}>
                    📋 Listar Veículos
                  </button>
                  <button onClick={() => setPagina("adicionar")}>
                    ➕ Adicionar Veículo
                  </button>
                  <button onClick={() => setPagina("editar")}>
                    ✏️ Editar Veículo
                  </button>
                  <button onClick={() => setPagina("excluir")}>
                    ❌ Excluir Veículo
                  </button>
                </div>
                {/* Sair/Deslogar */}
                <button className="sair" onClick={() => setPagina("login")}>
                  Sair
                </button>
              </>
            )}

            {/* Listar Veículos */}
            {pagina === "listar" && (
              <>
                <ListaVeiculos veiculos={veiculos} setVeiculos={setVeiculos} />
                <button className="voltar" onClick={() => setPagina("menu")}>
                  Voltar
                </button>
              </>
            )}
            {/* Adicionar Veículo */}
            {pagina === "adicionar" && (
              <>
                <AddVeiculo veiculos={veiculos} setVeiculos={setVeiculos} />
                <button className="voltar" onClick={() => setPagina("menu")}>
                  Voltar
                </button>
              </>
            )}
            {/* Editar Veículo */}
            {pagina === "editar" && (
              <>
                {!editando ? (
                  <>
                    <h2>Selecione um veículo para editar:</h2>
                    {veiculos.map((v) => (
                      <div key={v.id} className="lista-item">
                        {v.modelo} - {v.placa}
                        <button onClick={() => setEditando(v)}>Editar</button>
                      </div>
                    ))}
                  </>
                ) : (
                  <EditarVeiculo
                    veiculo={editando}
                    onSalvar={salvarEdicao}
                    onCancelar={() => setEditando(null)}
                  />
                )}

                <button className="voltar" onClick={() => setPagina("menu")}>
                  Voltar
                </button>
              </>
            )}
            {/* Excluir */}
            {pagina === "excluir" && (
              <>
                <ListaVeiculos veiculos={veiculos} setVeiculos={setVeiculos} />
                <button className="voltar" onClick={() => setPagina("menu")}>
                  Voltar
                </button>
              </>
            )}
          </>
        )}
      </div>
    </>
  );
}
