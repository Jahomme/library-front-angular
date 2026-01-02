import { Component, OnInit, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms'; // Para o ngModel do search
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideSearch, lucideBookOpen, lucidePlus } from '@ng-icons/lucide';
import { AutorItemComponent } from '../autor-item/autor-item.component';
import { AutorService } from '../autores.service';
import { Autor } from '../models/autores.model';
import { ConfirmationModalComponent } from '../../../shared/components/confirmation-modal/confirmation-modal.component';

@Component({
  selector: 'app-autores',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    FormsModule,
    NgIcon,
    AutorItemComponent,
    ConfirmationModalComponent,
  ],
  providers: [provideIcons({ lucideSearch, lucideBookOpen, lucidePlus })],
  templateUrl: './autores.component.html',
  styleUrl: './autores.component.css',
})
export class AutoresComponent implements OnInit {
  private autoresService = inject(AutorService);

  autores = signal<Autor[]>([]);
  searchTerm = signal('');

  deleteModalOpen = signal(false);
  autorParaDeletar = signal<string | null>(null);

  filteredAutores = computed(() => {
    const term = this.searchTerm().toLowerCase();
    return this.autores().filter((autor) =>
      autor.nome.toLowerCase().includes(term)
    );
  });

  ngOnInit(): void {
    this.carregarAutores();
  }

  carregarAutores() {
    this.autoresService.listarAutores().subscribe({
      next: (data) => {
        const lista = data;
        this.autores.set(lista);
      },
      error: (err) => console.error(err),
    });
  }

  onDeleteRequest(id: string) {
    this.autorParaDeletar.set(id);
    this.deleteModalOpen.set(true);
  }

  onConfirmDelete() {
    const id = this.autorParaDeletar();
    if (id) {
      this.autoresService.excluir(id).subscribe({
        next: () => {
          this.autores.update((lista) => lista.filter((a) => a.id !== id));

          this.closeModal();
        },
        error: (err) => {
          console.error(err);
          if (err.status === 400) {
            console.error(
              'Não é possível excluir: Autor possui livros cadastrados.'
            );
          } else {
            console.error('Erro ao excluir autor.');
          }
          this.closeModal();
        },
      });
    }
  }

  closeModal() {
    this.deleteModalOpen.set(false);
    this.autorParaDeletar.set(null);
  }
}
