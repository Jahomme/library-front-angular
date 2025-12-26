import { Book } from "../../../books/models/book.model";


export interface Autor {
  id?: string;
  nome: string;
  dataNascimento: string;
  nacionalidade: string;
  livros?: Book[];
  dataCadastro?: string;
  dataAtualizacao?: string;
  idUsuario?: string;
}
