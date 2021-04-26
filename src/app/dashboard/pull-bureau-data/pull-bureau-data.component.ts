import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, Validators } from '@angular/forms';

import { ExcelDownloadService } from '../../services/excelServices/excel-download.service';

@Component({
  selector: 'app-pull-bureau-data',
  templateUrl: './pull-bureau-data.component.html',
  styleUrls: ['./pull-bureau-data.component.less']
})
export class PullBureauDataComponent implements OnInit {

  householdID: any;
  phoneNumber: any;
  householdNumber: any;
  validPhone?: boolean;
  validID? : boolean;

  constructor(private _excelDownloadService: ExcelDownloadService) { }

  ngOnInit(): void {
    this.householdID = new FormControl('', [Validators.required]);
    this.phoneNumber = new FormControl('', [Validators.required]);
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

  checkPhoneForDownload(value: string) {
    console.log(value);
    this._excelDownloadService.checkValidPhoneValue(value).subscribe((response: any) => {
      // console.log(response.status);
      if(response) {
        this.householdNumber = response.household_number;
        console.log(this.householdNumber);
        this.validPhone = true;
      } else {
        this.validPhone = false;
      }
    });
  }

  downloadHeatmap(value: any) {
    this._excelDownloadService.downloadHeatmapExcel(value);
  }
  
  downloadCombined(value: any) {
    this._excelDownloadService.downloadCombinedExcel(value);
  }

}
