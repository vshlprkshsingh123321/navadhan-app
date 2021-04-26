import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, Validators } from '@angular/forms';

import { ExcelDownloadService } from '../../services/excelServices/excel-download.service';

@Component({
  selector: 'app-bulk-reports',
  templateUrl: './bulk-reports.component.html',
  styleUrls: ['./bulk-reports.component.less']
})
export class BulkReportsComponent implements OnInit {

  selected = '0';
  CSOdata: any = [];
  CSOSelect: any;
  CSODownload: boolean = false;
  householdIDFrom: any;
  householdIDTo: any;

  constructor(private _excelDownloadService: ExcelDownloadService) { }

  ngOnInit(): void {
    this.householdIDFrom = new FormControl('', [Validators.required]);
    this.householdIDTo = new FormControl('', [Validators.required]);
    this.CSOSelect = new FormControl('', [Validators.required]);
    this._excelDownloadService.getCsoData().subscribe((response: any) => {
      console.log(response);

      this.CSOdata.push({
        name: 'For all',
        value: 0
      });
      response.result.forEach((element: any) => {
        let str = element.employee_name.toLowerCase().replace(/\b[a-z]/g, function(letter: any) {
          return letter.toUpperCase();
        });
        this.CSOdata.push({
          name: str + '(' + element.employee_code + ')',
          value: element.employee_id
        })
      });
      console.log(this.CSOdata);
    });
  };

  checkCSOWiseDownload(type: any) {
    if(type == 'CSO'){
      this.CSODownload = true;
    }
  }

  downloadBulkCSOWise() {
    console.log(this.CSOSelect.value)
    this._excelDownloadService.downloadCSOWiseBulkReport(this.CSOSelect.value)
  }

}
