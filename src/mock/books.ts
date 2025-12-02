import { Book } from "../app/books/book-item/book.model";
import { GeneroLivro } from "../app/enum/generos";


export const MOCK_BOOKS: Book[] = [
  {
    id: 'a3e9f9d9-2fa4-4c3b-bf1a-b9a4f9a29b1f',
    isbn: '9780132350884',
    titulo: 'Clean Code',
    dataPublicacao: '2008-08-01',
    genero: GeneroLivro.TECNOLOGIA,
    preco: 69.9,
    autor: {
      id: 'e1b1dd8c-6a4b-4b3e-8f4c-1ad4f9d44877',
      nome: 'Robert C. Martin',
    },
  },
  {
    id: 'b6f41d7a-6b7e-41c6-a1f8-2f14083ef123',
    isbn: '9780201616224',
    titulo: 'The Pragmatic Programmer',
    dataPublicacao: '1999-10-20',
    genero: GeneroLivro.TECNOLOGIA,
    preco: 64.9,
    autor: {
      id: 'd2c4f8f9-1a25-4b66-a1b3-2a9f4a5e9123',
      nome: 'David Thomas & Andrew Hunt',
    },
  },
  {
    id: 'c1d7f8a2-9c7b-48d9-823f-3d3f4b7b21a4',
    isbn: '0201633612',
    titulo: 'Design Patterns',
    dataPublicacao: '1994-10-31',
    genero: GeneroLivro.TECNOLOGIA,
    preco: 79.9,
    autor: {
      id: 'f5a2b3c4-4d6e-4f66-92a8-7bdf9c3e8a55',
      nome: 'Erich Gamma, Richard Helm, Ralph Johnson, John Vlissides',
    },
  },
  {
    id: 'd4e8b9d0-3a6f-4e7b-9c8a-5f8e2c9a2f6b',
    isbn: '9780451524935',
    titulo: '1984',
    dataPublicacao: '1949-06-08',
    genero: GeneroLivro.FICCAO,
    preco: 29.9,
    autor: {
      id: 'a4b6c7d8-9e0f-4a3b-b2c1-3d4e5f6a7b88',
      nome: 'George Orwell',
    },
  },
  {
    id: 'e7f2a3b1-5c4d-4d6a-8f1b-6a7f3c9e4b22',
    isbn: '9788520910439',
    titulo: 'Dom Casmurro',
    dataPublicacao: '1899-01-01',
    genero: GeneroLivro.LITERATURA_BRASILEIRA,
    preco: 24.9,
    autor: {
      id: 'b7c8d9e0-1f2a-4b3c-9d7f-6a9b2c3d4e55',
      nome: 'Machado de Assis',
    },
  },
  {
    id: 'f9a8b7c6-2d4e-48c7-8b6a-1c3f9d6e2f33',
    isbn: '9788520910446',
    titulo: 'O Cortiço',
    dataPublicacao: '1890-01-01',
    genero: GeneroLivro.LITERATURA_BRASILEIRA,
    preco: 19.9,
    autor: {
      id: 'c9d8e7f6-3b5a-4a6c-9b8f-2e3f4a5b6c77',
      nome: 'Aluísio Azevedo',
    },
  },
];

