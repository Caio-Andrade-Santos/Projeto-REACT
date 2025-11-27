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

  // --- MODELO ---
  set modelo(valor) {
    this._modelo = valor?.trim() || "Modelo não informado";
  }

  get modelo() {
    return this._modelo;
  }

  // --- PLACA ---
  set placa(valor) {
    if (!valor) {
      this._placa = "XXX-0000";
      return;
    }

    const placaLimpa = valor.toUpperCase().trim();

    // Padrão antigo: ABC-1234
    const regexAntiga = /^[A-Z]{3}-?\d{4}$/;

    // Padrão Mercosul: ABC1D23
    const regexMercosul = /^[A-Z]{3}\d[A-Z]\d{2}$/;

    if (regexAntiga.test(placaLimpa)) {
      // Formata automaticamente para ABC-1234
      const formatada = placaLimpa.includes("-")
        ? placaLimpa
        : placaLimpa.slice(0, 3) + "-" + placaLimpa.slice(3);

      this._placa = formatada;
    }
    else if (regexMercosul.test(placaLimpa)) {
      // Mantém no padrão Mercosul
      this._placa = placaLimpa;
    }
    else {
      // Placa inválida → padrão
      this._placa = "XXX-0000";
    }
  }

  get placa() {
    return this._placa;
  }

  // --- TIPO ---
  set tipo(valor) {
    this._tipo = valor?.trim() || "Carga";
  }

  get tipo() {
    return this._tipo;
  }

  // --- ANO ---
  set ano(valor) {
    const anoConvertido = Number(valor);
    this._ano = anoConvertido > 1900 ? anoConvertido : 2025;
  }

  get ano() {
    return this._ano;
  }
}

export default Veiculo;
