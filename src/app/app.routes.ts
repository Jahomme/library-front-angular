import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { BooksComponent } from './books/books.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'home',
    component: BooksComponent,
    data: {
      title: 'Meus Livros',
      subtitle: 'Gerenciador de livros e autores',
      icon: 'lucideBookOpen',
    },
  },
  {
    path: 'login',
    component: LoginComponent,
    data: {
      title: 'Login',
      subtitle: 'Realize login para gerenciar',
      icon: 'lucideLogIn',
      showLoginButton: false,
    },
  },
];
