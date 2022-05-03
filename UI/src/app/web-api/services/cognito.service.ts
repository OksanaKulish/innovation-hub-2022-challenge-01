import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import Amplify, { Auth } from 'aws-amplify';
import { environment } from 'src/environments/environment';
import awsmobile from 'src/aws-exports';

export interface IUser {
  email: string;
  password: string;
  showPassword: boolean;
  code: string;
  username: string;
}

@Injectable({
  providedIn: 'root',
})
export class CognitoService {
  private authenticationSubject: BehaviorSubject<any>;

  constructor() {
    Amplify.configure({
      Auth: awsmobile.aws_cognito_identity_pool_id,
    });

    this.authenticationSubject = new BehaviorSubject<boolean>(false);
  }

  public signUp(user: IUser): Promise<any> {
    return Auth.signUp({
      username: user.email,
      password: user.password,
    });
  }

  // public confirmSignUp(user: IUser): Promise<any> {
  //   return Auth.confirmSignUp(user.email, user.code);
  // }

  // public signIn(user: IUser): Promise<any> {
  //   return Auth.signIn(user.email, user.password)
  //   .then(() => {
  //     this.authenticationSubject.next(true);
  //   });
  // }

  // public signOut(): Promise<any> {
  //   return Auth.signOut()
  //   .then(() => {
  //     this.authenticationSubject.next(false);
  //   });
  // }

  // public isAuthenticated(): Promise<boolean> {
  //   if (this.authenticationSubject.value) {
  //     return Promise.resolve(true);
  //   } else {
  //     return this.getUser()
  //     .then((user: any) => {
  //       if (user) {
  //         return true;
  //       } else {
  //         return false;
  //       }
  //     }).catch(() => {
  //       return false;
  //     });
  //   }
  // }

  public getUser(): Promise<any> {
    return Auth.currentUserInfo();
  }

  public logOut(): Promise<any> {
    return Auth.signOut({ global: true });
  }

  // public updateUser(user: IUser): Promise<any> {
  //   return Auth.currentUserPoolUser()
  //   .then((cognitoUser: any) => {
  //     return Auth.updateUserAttributes(cognitoUser, user);
  //   });
  // }
  cognitoUser: any;
  // register(email: any, password: any) {

  //   const attributeList: never[] = [];

  //   return Observable.create((observer: { error: (arg0: any) => void; next: (arg0: any) => void; complete: () => void; }) => {
  //     userPool.signUp(email, password, attributeList, null, (err: any, result: { user: any; }) => {
  //       if (err) {
  //         console.log("signUp error", err);
  //         observer.error(err);
  //       }

  //       this.cognitoUser = result.user;
  //       console.log("signUp success", result);
  //       observer.next(result);
  //       observer.complete();
  //     });
  //   });

  // }

  // confirmAuthCode(code: any) {
  //   const user = {
  //     Username : this.cognitoUser.username,
  //     Pool : userPool
  //   };
  //   return Observable.create(observer => {
  //     const cognitoUser = new CognitoUser(user);
  //     cognitoUser.confirmRegistration(code, true, function(err, result) {
  //       if (err) {
  //         console.log(err);
  //         observer.error(err);
  //       }
  //       console.log("confirmAuthCode() success", result);
  //       observer.next(result);
  //       observer.complete();
  //     });
  //   });
  // }

  // signIn(email, password) {

  //   const authenticationData = {
  //     Username : email,
  //     Password : password,
  //   };
  //   const authenticationDetails = new AuthenticationDetails(authenticationData);

  //   const userData = {
  //     Username : email,
  //     Pool : userPool
  //   };
  //   const cognitoUser = new CognitoUser(userData);

  //   return Observable.create(observer => {

  //     cognitoUser.authenticateUser(authenticationDetails, {
  //       onSuccess: function (result) {

  //         //console.log(result);
  //         observer.next(result);
  //         observer.complete();
  //       },
  //       onFailure: function(err) {
  //         console.log(err);
  //         observer.error(err);
  //       },
  //     });
  //   });
  // }

  // isLoggedIn() {
  //   return userPool.getCurrentUser() != null;
  // }

  // getAuthenticatedUser() {
  //   // gets the current user from the local storage
  //   return userPool.getCurrentUser();
  // }
}
