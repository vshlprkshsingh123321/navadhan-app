import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, Validators } from '@angular/forms';

import { ExcelDownloadService } from '../../services/excelServices/excel-download.service';

@Component({
  selector: 'app-pass-through-sheet',
  templateUrl: './pass-through-sheet.component.html',
  styleUrls: ['./pass-through-sheet.component.less']
})
export class PassThroughSheetComponent implements OnInit {

  householdID: any;
  fileCreated? : boolean;
  ptsFilename: any;

  constructor(private _excelDownloadService: ExcelDownloadService) { }

  ngOnInit(): void {
    this.householdID = new FormControl('', [Validators.required]);
  }

  checkForDownload(value: string) {
    console.log(value);
    this._excelDownloadService.createPTSExcel(value).subscribe((response: any) => {
      console.log(response);
      if(response) {
        this.ptsFilename = response.pts_filename
        this.fileCreated = true;
      } else {
        this.fileCreated = false;
      }
    });
  }

  downloadCreatedPTS() {
    this._excelDownloadService.downloadCreatedFile(this.ptsFilename);
  }

}
