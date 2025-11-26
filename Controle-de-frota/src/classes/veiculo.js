class Veiculo {
  constructor(
    modelo = "Modelo não informado",
    placa = "XXX-0000",
    tipo = "Carga",
    ano = 2024,
    cor = "Indefinido",         // 🔥 nova propriedade
    km = 0                      // 🔥 nova propriedade
  ) {
    this.id = Date.now();
    this.modelo = modelo;
    this.placa = placa;
    this.tipo = tipo;
    this.ano = ano;

    this.cor = cor;             // 🔥 salva nova prop
    this.km = km;               // 🔥 salva nova prop
  }
}

export default Veiculo;
