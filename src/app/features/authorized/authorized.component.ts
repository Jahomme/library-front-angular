import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../core/auth/auth.service';

@Component({
  selector: 'app-authorized',
  standalone: true,
  imports: [],
  templateUrl: './authorized.component.html',
  styleUrl: './authorized.component.css',
})
export class AuthorizedComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private authService = inject(AuthService);

  ngOnInit() {
    //TODO - TOAST
    this.route.queryParams.subscribe((params) => {
      const code = params['code'];

      const verifier = sessionStorage.getItem('code_verifier');

      if (code && verifier) {
        this.authService.exchangeCodeForToken(code, verifier).subscribe({
          next: () => {
            this.router.navigate(['/']);
          },
          error: (err) => {
            console.error('Erro no login:', err);
            this.router.navigate(['/']);
          },
        });
      } else {
        this.router.navigate(['/']);
      }
    });
  }
}
