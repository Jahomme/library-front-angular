import { GeneroLivro } from "../../enum/generos";
import { Autor } from '../../features/autores/models/autores.model';

export interface Book {
  id?: string;
  isbn: string;
  titulo: string;
  dataPublicacao: string;
  genero: GeneroLivro;
  preco: number;
  autor: Autor;
}
