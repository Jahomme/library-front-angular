import { Component, Input, OnInit, inject, signal } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideBookOpen, lucideArrowLeft } from '@ng-icons/lucide';
import { Book } from '../models/book.model';
import { AutorService } from '../../features/autores/autores.service';
import { Autor } from '../../features/autores/models/autores.model';
import { BooksService } from '../books.service';
import { CadastroLivroDTO } from '../models/book-dto.model';

@Component({
  selector: 'app-book-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NgIcon],
  providers: [provideIcons({ lucideBookOpen, lucideArrowLeft })],
  templateUrl: './book-form.component.html',
  styleUrl: './book-form.component.css',
})
export class BookFormComponent implements OnInit {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private location = inject(Location);

  private autoresService = inject(AutorService);
  private route = inject(ActivatedRoute);
  private booksService = inject(BooksService);

  readonly autores = signal<Autor[]>([]);

  @Input() book?: Book;
  @Input() isEdit = false;

  form!: FormGroup;
  bookId?: string;

  ngOnInit(): void {
    this.initForm();

    this.autoresService.listarAutores().subscribe({
      next: (data) => {
        const lista = data;
        this.autores.set(lista);
      },
      error: (erro) => {
        console.error('Erro ao carregar autores:', erro);
      },
    });

    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.isEdit = true;
      this.bookId = id;

      this.booksService.getById(id).subscribe({
        next: (book) => {
          this.form.patchValue({
            id: book.id,
            titulo: book.titulo,
            isbn: book.isbn,
            preco: book.preco,
            dataPublicacao: book.dataPublicacao,
            genero: book.genero,
            idAutor: book.autor.id,
          });
        },
        error: (err) => {
          console.error('Erro ao carregar livro', err);
        },
      });
    }
  }

  private initForm() {
    this.form = this.fb.group({
      id: [null],
      titulo: ['', [Validators.required]],
      isbn: ['', [Validators.required]],
      preco: [null, [Validators.required, Validators.min(0)]],
      dataPublicacao: ['', [Validators.required]],
      genero: ['', [Validators.required]],
      idAutor: ['', [Validators.required]],
    });
  }

  goBack() {
    this.location.back();
  }

  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const dto: CadastroLivroDTO = this.form.value;

    if (this.isEdit && this.bookId) {
      this.booksService.atualizar(dto).subscribe({
        next: () => {
          this.router.navigate(['/livros']);
        },
        error: (erro) => {
          console.error('Erro ao atualizar:', erro);
        },
      });
    } else {
      this.booksService.salvar(dto).subscribe({
        next: () => {
          this.router.navigate(['/livros']);
        },
        error: (erro) => {
          console.error('Erro ao salvar:', erro);
        },
      });
    }
  }
}
