import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '../material.module';
import { SharedModule } from '../shared/components/shared.module';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SideMenuComponent } from './side-menu/side-menu.component';

const SHARED_DECLARATIVES = [
  HeaderComponent,
  FooterComponent
];

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        FormsModule,
        SharedModule,
        MaterialModule
    ],
    exports: [
      SHARED_DECLARATIVES
    ],
    declarations: [
      SHARED_DECLARATIVES,
      SideMenuComponent
    ]
})
export class LayoutModule { }
