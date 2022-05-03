import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Auth } from 'aws-amplify';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent implements AfterViewInit {
  public form: FormGroup;
  public isPasswordVisible = false;
  public isUserNameInputFocused = false;
  public hide = true;

  constructor(private router: Router, private toastr: ToastrService) {
    this.form = new FormGroup({
      username: new FormControl(''),
      password: new FormControl(''),
    });
  }

  @ViewChild('userNameInput', { static: true })
  public userNameInput: ElementRef | any;

  @ViewChild('passwordInput', { static: true })
  public passwordInput: ElementRef | any;

  public ngAfterViewInit() {
    setTimeout(() => {
      this.userNameInput.nativeElement.focus();
    });
  }

  public signIn(): void {
    Auth.signIn({
      username: this.form.controls['username'].value,
      password: this.form.controls['password'].value,
    })
      .then(() => this.router.navigate(['predicted']))
      .catch((error) => this.toastr.error(error, 'Sign In Error!'));
  }

  public userNameInputFocus() {
    this.isUserNameInputFocused = true;
  }

  public userNameInputBlur() {
    this.isUserNameInputFocused = false;
  }

  public onPasswordShow() {
    this.isPasswordVisible = !this.isPasswordVisible;
    this.setFocus('password');
  }

  private setFocus(input: string) {
    const targetElem = document.getElementById(input);
    setTimeout(function waitTargetElem() {
      if (document.body.contains(targetElem)) {
        targetElem?.focus();
      } else {
        setTimeout(waitTargetElem, 100);
      }
    }, 100);
  }

  public getUser(): Promise<any> {
    return Auth.currentUserInfo();
  }
}
