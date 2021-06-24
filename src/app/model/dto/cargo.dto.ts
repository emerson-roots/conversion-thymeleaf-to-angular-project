export interface CargoDTO {
  id: number;
  nome: string;
  departamento: {
    id: number;
    nome: string;
  }
}
