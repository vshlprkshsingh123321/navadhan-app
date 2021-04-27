import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, Validators } from '@angular/forms';
import { format } from 'date-fns';
import { DatePipe } from '@angular/common'

import { ExcelDownloadService } from '../../services/excelServices/excel-download.service';

@Component({
  selector: 'app-lead-tracker',
  templateUrl: './lead-tracker.component.html',
  styleUrls: ['./lead-tracker.component.less']
})
export class LeadTrackerComponent implements OnInit {

  selected = 0;
  branchSelect: any;
  fromDate: any;
  toDate: any;
  branchData: any = [];
  branchDownload: boolean = false;

  constructor(private _excelDownloadService: ExcelDownloadService, private datepipe: DatePipe) { }

  ngOnInit(): void {
    this.branchSelect = new FormControl('', [Validators.required]);
    this.fromDate = new FormControl('', [Validators.required]);
    this.toDate = new FormControl('', [Validators.required]);
    this._excelDownloadService.getBranchData().subscribe((response: any) => {
      this.branchData = response.result
      console.log(response);
    })
  }

  checkBranchDownload() {
    this.branchDownload = true;
  }

  downloadLeadTracker() {
    // let fDate = format(new Date(this.fromDate.value), 'yyyy-MM-dd');
    // console.log(fDate, fDate.toLocaleString());
    // console.log(this.branchSelect.value,this.datepipe.transform(fDate, 'yyyy-MM-dd'), format(new Date(this.fromDate.value), 'dd-MM-yyyy'), format(new Date(this.toDate.value), 'dd-MM-yyyy'))
    let data = {
      branch_id: this.branchSelect.value,
      lt_from_date: this.fromDate.value != "" ? format(new Date(this.fromDate.value), 'yyyy-MM-dd') : "",
      lt_to_date: this.toDate.value != "" ? format(new Date(this.toDate.value), 'yyyy-MM-dd'): ""
    }
    this._excelDownloadService.downloadLt(data);
  }

}
