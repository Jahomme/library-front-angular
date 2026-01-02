import { Component, OnInit, inject } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router'; // <--- 1. Importar ActivatedRoute
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideSave, lucideX } from '@ng-icons/lucide';
import { AutorService } from '../autores.service';
import { Autor } from '../models/autores.model';

@Component({
  selector: 'app-autor-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NgIcon],
  providers: [provideIcons({ lucideSave, lucideX })],
  templateUrl: './autor-form.component.html',
  styleUrl: './autor-form.component.css',
})
export class AutorFormComponent implements OnInit {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private location = inject(Location);
  private route = inject(ActivatedRoute);
  private autorService = inject(AutorService);

  form!: FormGroup;
  isEdit = false;
  autorId?: string;

  ngOnInit(): void {
    this.initForm();

    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.isEdit = true;
      this.autorId = id;

      this.autorService.getById(id).subscribe({
        next: (autor) => {
          this.form.patchValue({
            id: autor.id,
            nome: autor.nome,
            dataNascimento: autor.dataNascimento,
            nacionalidade: autor.nacionalidade,
          });
        },
        error: (err) => {
          console.error('Erro ao carregar autor', err);
          this.goBack();
        },
      });
    }
  }

  private initForm() {
    this.form = this.fb.group({
      id: [null],
      nome: ['', [Validators.required]],
      dataNascimento: ['', [Validators.required]],
      nacionalidade: ['', [Validators.required]],
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

    const autor: Autor = this.form.value;

    if (this.isEdit && this.autorId) {
      autor.id = this.autorId;

      this.autorService.atualizar(autor).subscribe({
        next: () => {
          this.router.navigate(['/autores']);
        },
        error: (err) => {
          console.error('Erro ao atualizar', err);
        },
      });
    } else {
      this.autorService.salvar(autor).subscribe({
        next: () => {
          this.router.navigate(['/autores']);
        },
        error: (err) => {
          console.error('Erro ao salvar', err);
        },
      });
    }
  }
}
