import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PredictService } from './web-api/services/predict.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './layout/header/header.component';
import { PredictionComponent } from './shared/components/prediction/prediction.component';
import { FooterComponent } from './layout/footer/footer.component';
import { LoadingBarComponent } from './shared/components/loading-bar/loading-bar.component';
import { YearPickerComponent } from './shared/components/year-picker/year-picker.component';

@NgModule({
  declarations: [
    AppComponent,
    PredictionComponent,
    HeaderComponent,
    FooterComponent,
    LoadingBarComponent,
    YearPickerComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [HttpClient, PredictService, YearPickerComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
