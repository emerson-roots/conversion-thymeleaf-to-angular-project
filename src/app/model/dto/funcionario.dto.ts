export interface FuncionarioDTO {
  id: number;
  nome: string;
  salario: number,
  dataEntrada: Date,
  dataSaida: Date,

  endereco: {
    id: number,
    logradouro: string,
    bairro: string,
    cidade: string,
    uf: string,
    cep: string,
    numero: number,
    complemento: string,
  },

  cargo: {
    id: number,
    nome: string,
    departamento: {
      id: number,
      nome: string
    }
  }

}
