import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { tap } from 'rxjs';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);

  private readonly TOKEN_URL = environment.oauth.tokenEndpoint;
  private readonly REDIRECT_URI = environment.oauth.redirectUri;
  private readonly CLIENT_ID = environment.oauth.clientId;

  isAuthenticated = signal(!!localStorage.getItem('access_token'));

  generateCodeVerifier(): string {
    const array = new Uint8Array(32);
    window.crypto.getRandomValues(array);
    return this.base64UrlEncode(array);
  }

  async generateCodeChallenge(codeVerifier: string): Promise<string> {
    const encoder = new TextEncoder();
    const data = encoder.encode(codeVerifier);
    const digest = await window.crypto.subtle.digest('SHA-256', data);

    return this.base64UrlEncode(new Uint8Array(digest));
  }

  exchangeCodeForToken(code: string, codeVerifier: string) {
    const payload = new URLSearchParams();
    payload.append('grant_type', 'authorization_code');
    payload.append('client_id', this.CLIENT_ID);
    payload.append('redirect_uri', this.REDIRECT_URI);
    payload.append('code', code);
    payload.append('code_verifier', codeVerifier);

    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
    });

    return this.http
      .post<any>(this.TOKEN_URL, payload.toString(), { headers })
      .pipe(
        tap((response) => {
          localStorage.setItem('access_token', response.access_token);
          localStorage.setItem('refresh_token', response.refresh_token);
          localStorage.setItem('id_token', response.id_token);

          sessionStorage.removeItem('code_verifier');
          this.isAuthenticated.set(true);
        })
      );
  }

  async login() {
    const verifier = this.generateCodeVerifier();
    sessionStorage.setItem('code_verifier', verifier);
    const challenge = await this.generateCodeChallenge(verifier);

    const params = new URLSearchParams({
      response_type: 'code',
      client_id: this.CLIENT_ID,
      scope: 'openid profile',
      redirect_uri: this.REDIRECT_URI,
      code_challenge: challenge,
      code_challenge_method: 'S256',
    });

    window.location.href = `${
      environment.oauth.authEndpoint
    }?${params.toString()}`;
  }

  logout() {
    this.limparTokensLocais();
    this.isAuthenticated.set(false);
    window.location.href = 'http://localhost:8080/logout';
  }

  expire() {
    this.limparTokensLocais();
    this.login();
  }

  private limparTokensLocais() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('id_token');
    sessionStorage.removeItem('code_verifier');
  }

  private base64UrlEncode(array: Uint8Array) {
    const str = String.fromCharCode(...array);
    const base64 = btoa(str);
    return base64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
  }

  constructor() {}
}
