import { Injectable, signal } from "@angular/core";

@Injectable({
  providedIn: 'root',
})
export class BooksService {
  selectedGenres = signal<string[]>([]);
  search = signal<string | undefined>(undefined)

  toggleGenre(genre: string) {
    this.selectedGenres.update((currentGenres) => {
      if (currentGenres.includes(genre)) {
        return currentGenres.filter((g) => g !== genre);
      } else {
        return [...currentGenres, genre];
      }
    });
  }

  isSelected(genre: string): boolean {
    return this.selectedGenres().includes(genre);
  }

  findAllBooksByName() {
    console.log(this.search())
  }

  findAllBooksByGenre() {
    console.log(this.selectedGenres())
  }
}
