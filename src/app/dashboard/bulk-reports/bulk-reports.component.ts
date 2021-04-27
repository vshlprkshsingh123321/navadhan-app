import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, Validators } from '@angular/forms';
import { format } from 'date-fns';

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
  fromDate: any;
  toDate: any;
  CSODownload: boolean = false;
  householdIDFrom: any;
  householdIDTo: any;
  validhhids: boolean = false;
  hhidData = {}

  constructor(private _excelDownloadService: ExcelDownloadService) { }

  ngOnInit(): void {
    this.householdIDFrom = new FormControl('', [Validators.required]);
    this.householdIDTo = new FormControl('', [Validators.required]);
    this.CSOSelect = new FormControl('', [Validators.required]);
    this.fromDate = new FormControl('', [Validators.required]);
    this.toDate = new FormControl('', [Validators.required]);
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

  validateHouseholdIds() {
    this._excelDownloadService.validatehhidBulkReport(this.householdIDFrom.value, this.householdIDTo.value).subscribe((response: any) => {
      console.log(response);
      if(response) {
        this.hhidData = response.result;
        console.log(this.hhidData);
        this.validhhids = true;
      } else {
        this.validhhids = false;
      }
    })
  }

  downloadBulkCSOWise() {
    let data = {
      cso: this.CSOSelect.value,
      from_date: this.fromDate.value != "" ? format(new Date(this.fromDate.value), 'yyyy-MM-dd') : "",
      to_date: this.toDate.value != "" ? format(new Date(this.toDate.value), 'yyyy-MM-dd') : ""
    }
    console.log(data);
    this._excelDownloadService.downloadCSOWiseBulkReport(data);
  }

  downloadBulkhhidWise() {
    this._excelDownloadService.downloadhhidWiseBulkReport(this.hhidData);
  }

}
