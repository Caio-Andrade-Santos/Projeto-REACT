import "./../App.css";

export default function Navbar({ user, menuAberto, toggleMenu, setPagina }) {
  // Lista de links do menu lateral
  const links = [
    { nome: "Menu", page: "menu" },
    { nome: "Listar Veículos", page: "listar" },
    { nome: "Adicionar Veículo", page: "adicionar" },
    { nome: "Editar Veículo", page: "editar" },
    { nome: "Excluir Veículo", page: "excluir" },
    { nome: "Sair", page: "login" },
  ];

  return (
    <nav className="navbar">
      {/* Lado esquerdo: foto e nome do usuário */}
      <div className="navbar-left">
        <img src={user.foto} alt="foto perfil" className="navbar-foto" />
        <span className="navbar-nome">{user.nome}</span>
      </div>

      {/* Ícone do menu */}
      <div className="navbar-menu-icon" onClick={toggleMenu}>
        ☰
      </div>

      {/* Menu lateral */}
      {menuAberto && (
        <div className="menu-lateral">
          {links.map((link) => (
            <button
              key={link.page}
              onClick={() => {
                setPagina(link.page); // muda a página
                toggleMenu(); // fecha o menu
              }}
            >
              {link.nome}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
}
