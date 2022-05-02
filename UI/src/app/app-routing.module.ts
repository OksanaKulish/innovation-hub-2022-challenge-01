import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PredictionComponent } from './components/prediction/prediction.component';
import { PageContainerComponent } from './layout/page-container/page-container.component';
import { LoginPageComponent } from './login/login-page/login-page.component';
import { SignUpComponent } from './login/sign-up/sign-up.component';
import { AuthGuard } from './web-api/services/auth.guard';

const routes: Routes = [
  { path: 'login', component: LoginPageComponent },
  { path: 'sign-up', component: SignUpComponent },
  {
    path: '',
    component: PageContainerComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'predicted',
        component: PredictionComponent,
        canActivate: [AuthGuard]
      }
    ],
  },
  { path: '**', redirectTo: 'predicted' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
