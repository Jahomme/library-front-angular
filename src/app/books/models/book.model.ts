import { GeneroLivro } from "../../enum/generos";

export interface Book {
  id?: string;
  isbn: string;
  titulo: string;
  dataPublicacao: string;
  genero: GeneroLivro;
  preco: number;
}
