import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PredictionComponent } from './shared/components/prediction/prediction.component';

const routes: Routes = [
  { path: 'prediction', component: PredictionComponent },
  { path: '', redirectTo: '/prediction', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
