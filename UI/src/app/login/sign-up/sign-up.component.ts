import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Auth } from 'aws-amplify';
import { ToastrService } from 'ngx-toastr';
import { CognitoService } from 'src/app/web-api/services/cognito.service';

export interface IUserSignUp {
  email: string;
  password: string;
  showPassword: boolean;
  code: string;
  username: string;
  givenName: string;
  familyName: string;
}

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent {
  public isConfirm: boolean;
  public form: FormGroup;
  public hide = true;

  constructor(
    public cognitoService: CognitoService,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.isConfirm = false;
    this.form = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.email, Validators.required]),
      givenName: new FormControl('', Validators.required),
      familyName: new FormControl('', Validators.required),
      code: new FormControl(''),
    });
  }

  public signUp() {
    Auth.signUp({
      username: this.form.controls['email'].value,
      password: this.form.controls['password'].value,
      attributes: {
        email: this.form.controls['email'].value,
        given_name: this.form.controls['givenName'].value,
        family_name: this.form.controls['familyName'].value,
      },
    })
      .then(() => {
        this.isConfirm = true;
      })
      .catch((error) => this.toastr.error(error, 'Sign Up Error!'));
  }

  public confirmSignUp(): Promise<any> | any {
      return Auth.confirmSignUp(
        this.form.controls['email'].value,
        this.form.controls['code'].value
      )
        .then(() => this.router.navigate(['predicted']))
        .catch((error) => {
          this.toastr.error(error, 'Error!');
        });
  }

  public isCtrlValid(ctrl: string) {
    let isValid =
      this.form.controls[ctrl].dirty || this.form.controls[ctrl].touched;

    return [ctrl, isValid] as const;
  }

  public isAuthenticated(): Promise<boolean> {
    return this.cognitoService
      .getUser()
      .then((user: any) => {
        if (user) {
          return true;
        } else {
          return false;
        }
      })
      .catch(() => {
        return false;
      });
  }
}
