import {
  HttpClient,
  HttpClientModule,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PredictService } from './web-api/services/predict.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { YearPickerComponent } from './shared/components/year-picker/year-picker.component';
import { LayoutModule } from './layout/layout.module';
import { ComponentsModule } from './components/components.module';
import { ErrorInterceptor } from './web-api/interceptors/error-response.interceptor';
import { HighchartsChartModule } from 'highcharts-angular';
import { SharedModule } from './shared/shared.module';
import { RouterModule } from '@angular/router';
import { LoginModule } from './login/login.module';
import { ToastrModule } from 'ngx-toastr';
import { JwtInterceptor } from './web-api/interceptors/jwt.interceptor';
import { AuthGuard } from './web-api/services/auth.guard';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    LayoutModule,
    ComponentsModule,
    HighchartsChartModule,
    RouterModule,
    LoginModule,
    ToastrModule.forRoot({
      closeButton: true,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
    }),
  ],
  providers: [
    HttpClient,
    PredictService,
    YearPickerComponent,
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
