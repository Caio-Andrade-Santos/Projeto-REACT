class Veiculo {
  constructor(
    modelo = "Modelo não informado",
    placa = "XXX-0000",
    tipo = "Carga",
    ano = 2025
  ) {
    this.id = Date.now();
    this.modelo = modelo;
    this.placa = placa;
    this.tipo = tipo;
    this.ano = ano;
  }
}

export default Veiculo;
