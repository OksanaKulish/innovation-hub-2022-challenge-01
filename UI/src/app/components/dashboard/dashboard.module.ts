import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { GridsterModule } from 'angular-gridster2';
import { MaterialModule } from 'src/app/material.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { DashboardGridsterConfigService } from './dashboard-gridster-config.service';
import { DashboardComponent } from './dashboard.component';

@NgModule({
  imports: [CommonModule,MaterialModule, SharedModule, GridsterModule],
  providers: [DashboardGridsterConfigService],

  exports: [DashboardComponent],
  declarations: [DashboardComponent],
})
export class DashboardModule {}
