import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class ExcelDownloadService {

  constructor(private http: HttpClient) { }

  checkValidValue(value: any) {
    console.log(value);
    let data = {
      value: value
    }
    return this.http.post('http://localhost:3000/validate-excel-download', data);
  }

  checkValidPhoneValue(value: any) {
    console.log(value);
    let data = {
      value: value
    }
    return this.http.post('http://localhost:3000/validate-phone-excel-download', data);
  }

  createPTSExcel(value: any) {
    let data = {
      value: value
    }
    return this.http.post('http://localhost:3000/create-PTS-excel', data);
  }

  createSupportingZip(value: any) {
    let data = {
      value: value
    }
    return this.http.post('http://localhost:3000/create-support-zip', data);
  }

  getBranchData() {
    return this.http.get('http://localhost:3000/getBranch');
  }
  
  getCsoData() {
    return this.http.get('http://localhost:3000/getCSO');
  }

  downloadHeatmapExcel(data: any) {
    this.http.get('http://localhost:80/cb/credit_bureau_heatmap_download.php?household_number=' + data, {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      responseType: 'blob' 
   }).subscribe((response) => {
     console.log(response);
     this.downloadFile(response);
    });
  }

  downloadCombinedExcel(data: any) {
    this.http.get('http://localhost:80/cb/credit_bureau_combined_download.php?household_number=' + data, {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      responseType: 'blob' 
    }).subscribe((response) => {
      this.downloadFile(response);
    });
  }

  downloadCSOWiseBulkReport(data: any) {
    this.http.get('http://localhost:80/cb/credit_bureau_summary_dump.php?cso=' + data + '&flag=C', {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      responseType: 'blob' 
    }).subscribe((response) => {
      this.downloadFile(response);
    });
  }

  downloadCreatedFile(value: any) {
    console.log(value);
    this.http.get('http://localhost:80/cb/download.php?file=' + value, {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      responseType: 'blob' 
    }).subscribe((response) => {
      this.downloadFile(response);
    });
  }

  downloadLt(data: any) {
    this.http.get("http://localhost:80/cb/lead_tracker_dump.php?branch_id='" + data.branch_id + "'&from_date='" + data.lt_from_date + "'&to_date='" + data.lt_to_date + "'", {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      responseType: 'blob' 
    }).subscribe((response) => {
      this.downloadFile(response);
    });
  }

  downloadFile(data: any) {
//     // const blob = new Blob([response.body], { type: response.headers.get('content-type') });
//     // fileName = fileName || response.headers.get('content-disposition').split(';')[0];
//     // const file = new File([blob], fileName, { type: response.headers.get('content-type') });
//     // saveAs(file);

    const blob = new Blob([data], { type: 'application/vnd.ms-excel' });
    const url= window.URL.createObjectURL(blob);
    window.open(url);
  }

}
