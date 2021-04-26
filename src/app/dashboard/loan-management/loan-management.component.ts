import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, Validators } from '@angular/forms';

import { ExcelDownloadService } from '../../services/excelServices/excel-download.service';

@Component({
  selector: 'app-loan-management',
  templateUrl: './loan-management.component.html',
  styleUrls: ['./loan-management.component.less']
})
export class LoanManagementComponent implements OnInit {

  householdID: any;
  validID? : boolean;

  constructor(private _excelDownloadService: ExcelDownloadService) { }

  ngOnInit(): void {
    this.householdID = new FormControl('', [Validators.required]);
  }

  checkForDownload(value: string) {
    console.log(value);
    this._excelDownloadService.checkValidValue(value).subscribe((response: any) => {
      // console.log(response.status);
      if(response) {
        this.validID = true;
      } else {
        this.validID = false;
      }
    });
  }

  downloadHeatmap(value: any) {
    // this._excelDownloadService.downloadHeatmap(value).subscribe((response) => {
    //   console.log(response);
    // });
  }

}
