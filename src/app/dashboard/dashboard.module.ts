import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule, DatePipe } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AuthGuard } from '../services/loginServices/auth.guard';
import { ClickOutsideModule } from 'ng-click-outside';
import { AngularMaterialModule } from '../angular-material.module';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { TopnavComponent } from '../dashboard/topnav/topnav.component';
import { SidenavComponent } from '../dashboard/sidenav/sidenav.component';
import { PullBureauDataComponent } from '../dashboard/pull-bureau-data/pull-bureau-data.component';
import { LoanManagementComponent } from './loan-management/loan-management.component';
import { DownloadFilesComponent } from './download-files/download-files.component';
import { BulkReportsComponent } from './bulk-reports/bulk-reports.component';
import { PassThroughSheetComponent } from './pass-through-sheet/pass-through-sheet.component';
import { LeadTrackerComponent } from './lead-tracker/lead-tracker.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: '', component: DashboardComponent, canActivate: [AuthGuard],
                children: [
                    {path: 'pull-bureau-data', component: PullBureauDataComponent},
                    {path: 'pass-through-sheet', component: PassThroughSheetComponent},
                    {path: 'supporting-files', component: DownloadFilesComponent},
                    {path: 'bulk-report', component: BulkReportsComponent},
                    {path: 'lead-tracker', component: LeadTrackerComponent},
                    {path: 'loan-management', component: LoanManagementComponent}
                ]
            }
        ]),
        ReactiveFormsModule,
        CommonModule,
        HttpClientModule,
        ClickOutsideModule,
        AngularMaterialModule
    ],
    declarations: [
        DashboardComponent,
        TopnavComponent,
        SidenavComponent,
        PullBureauDataComponent,
        LoanManagementComponent,
        DownloadFilesComponent,
        BulkReportsComponent,
        PassThroughSheetComponent,
        LeadTrackerComponent
    ],
    providers: [AuthGuard, DatePipe],
    entryComponents: []
})

export class DashboardModule { }