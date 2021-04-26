import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, Validators } from '@angular/forms';

import { ExcelDownloadService } from '../../services/excelServices/excel-download.service';

@Component({
  selector: 'app-download-files',
  templateUrl: './download-files.component.html',
  styleUrls: ['./download-files.component.less']
})
export class DownloadFilesComponent implements OnInit {

  householdID: any;
  validID? : boolean;

  constructor(private _excelDownloadService: ExcelDownloadService) { }

  ngOnInit(): void {
    this.householdID = new FormControl('', [Validators.required]);
  }

  checkForDownload(value: string) {
    console.log(value);
    this._excelDownloadService.createSupportingZip(value).subscribe((response: any) => {
      console.log(response);
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
