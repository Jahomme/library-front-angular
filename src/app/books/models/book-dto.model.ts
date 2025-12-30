export interface CadastroLivroDTO {
  id?: string;
  isbn: string;
  titulo: string;
  dataPublicacao: string;
  genero: string;
  preco: number;
  idAutor: string;
}
