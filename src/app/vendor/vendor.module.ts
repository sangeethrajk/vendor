import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout/layout.component';
import { MaterialModule } from '../shared/material.module';
import { VendorRoutingModule } from './vendor-routing.module';
import { HomeComponent } from './home/home.component';
import { RaiseBillComponent } from './raise-bill/raise-bill.component';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { ViewAllProjectsComponent } from './view-all-projects/view-all-projects.component';
import { CreateProjectComponent } from './create-project/create-project.component';
import { BillsComponent } from './bills/bills.component';
import { ViewEditProjectComponent } from './view-edit-project/view-edit-project.component';



@NgModule({
  declarations: [
    LayoutComponent,
    HomeComponent,
    RaiseBillComponent,
    ConfirmDialogComponent,
    ViewAllProjectsComponent,
    CreateProjectComponent,
    BillsComponent,
    ViewEditProjectComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    VendorRoutingModule
  ]
})
export class VendorModule { }
