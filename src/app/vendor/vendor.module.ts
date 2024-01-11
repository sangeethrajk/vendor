import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout/layout.component';
import { MaterialModule } from '../shared/material.module';
import { VendorRoutingModule } from './vendor-routing.module';
import { HomeComponent } from './home/home.component';
import { RaiseBillComponent } from './raise-bill/raise-bill.component';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { ProjectsComponent } from './projects/projects.component';
import { CreateProjectComponent } from './create-project/create-project.component';
import { BillsComponent } from './bills/bills.component';



@NgModule({
  declarations: [
    LayoutComponent,
    HomeComponent,
    RaiseBillComponent,
    ConfirmDialogComponent,
    ProjectsComponent,
    CreateProjectComponent,
    BillsComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    VendorRoutingModule
  ]
})
export class VendorModule { }
