import { Component, Input, OnInit, inject, signal } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
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
  private booksService = inject(BooksService);

  readonly autores = signal<Autor[]>([]);

  @Input() book?: Book;
  @Input() isEdit = false;

  form!: FormGroup;

  ngOnInit(): void {
    this.initForm();

    this.autoresService.listarAutores().subscribe({
      next: (data) => {
        this.autores.set(data);
      },
      error: (erro) => {
        console.error('Erro ao buscar autores:', erro);
      },
    });

    if (this.book) {
      this.form.patchValue(this.book);
    }
  }

  private initForm() {
    this.form = this.fb.group({
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
    if (this.form.valid) {
      const dto: CadastroLivroDTO = this.form.value;

      console.log('Enviando DTO:', dto);

      this.booksService.salvar(dto).subscribe({
        next: () => {
          console.log('Livro salvo com sucesso!');
          this.router.navigate(['/livros']);
        },
        error: (erro) => {
          console.error('Erro ao salvar:', erro);
        },
      });
    } else {
      this.form.markAllAsTouched();
    }
  }
}
