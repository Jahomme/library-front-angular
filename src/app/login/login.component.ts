import { Component, input, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  enteredEmail = signal<string>('')
  enteredPassword = signal<string>('')

  onSubmit() {
    console.log({email: this.enteredEmail(), password: this.enteredPassword()})
  }
}
