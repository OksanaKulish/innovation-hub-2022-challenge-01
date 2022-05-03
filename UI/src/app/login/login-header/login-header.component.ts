import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-header',
  templateUrl: './login-header.component.html',
  styleUrls: ['./login-header.component.scss'],
})
export class LoginHeaderComponent {
  constructor(private readonly _router: Router) {}

  public signUp() {
    this._router.navigate(['sign-up']);
  }

  public login() {
    this._router.navigate(['login']);
  }
}
