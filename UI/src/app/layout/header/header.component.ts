import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CognitoService } from 'src/app/web-api/services/cognito.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  public userName = '';

  constructor(public cognitoService: CognitoService, private router: Router) {
    this.getUser();
  }

  public logOut() {
    this.cognitoService.logOut().then(() => {
      this.router.navigate(['login']);
    });
  }

  public getUser() {
    this.cognitoService
      .getUser()
      .then(
        (x) =>
          (this.userName =
            x?.attributes.family_name + ' ' + x?.attributes.given_name)
      )
      .catch((error) => {
        console.log('getUser ' + error);
      });
  }

  public isShow = true;

  public onClose() {
    this.isShow = false;
  }
}
