import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LayoutComponent } from './layout/layout.component';
import { RaiseBillComponent } from './raise-bill/raise-bill.component';
import { ViewAllProjectsComponent } from './view-all-projects/view-all-projects.component';
import { CreateProjectComponent } from './create-project/create-project.component';
import { BillsComponent } from './bills/bills.component';

const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [
            { path: '', redirectTo: 'home', pathMatch: 'full' },
            { path: 'home', component: HomeComponent },
            { path: 'bills', component: BillsComponent },
            { path: 'raise-bill/:vendorProjectId/:vendorId/:workId', component: RaiseBillComponent },
            { path: 'view-all-projects', component: ViewAllProjectsComponent },
            { path: 'create-project', component: CreateProjectComponent },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class VendorRoutingModule { }