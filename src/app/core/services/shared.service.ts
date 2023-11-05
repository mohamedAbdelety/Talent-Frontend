import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  env = environment;

  constructor(private _snackBar: MatSnackBar, private http: HttpClient, private matDialog: MatDialog) { }

  openGreenSnackBar(msg: string, duration: number) {
    this._snackBar.open(msg, "OK", {
      duration,
      panelClass: ['green-snackbar']
    });
  }

  openDialog(dialogComponent: any, config: MatDialogConfig<any>): MatDialogRef<any> {
    return this.matDialog.open(dialogComponent, config)
  }

  openRedSnackBar(msg: string, duration: number) {
    this._snackBar.open(msg, "OK", {
      duration,
      panelClass: ['red-snackbar']
    });
  }

  downloadFile(event: HttpResponse<any>): void {
    if (event.headers.get('content-disposition')) {
      let downloadeFile = event.headers.get('content-disposition')?.split(";")[1].split("=")[1]
      let blob: Blob = event.body as Blob;
      let anchor = document.createElement('a')
      if (downloadeFile?.charAt(0) == '"' && downloadeFile?.charAt(downloadeFile.length - 1) == '"')
        downloadeFile = downloadeFile?.substring(1, downloadeFile.length - 1)
      anchor.download = downloadeFile || "Download";
      anchor.href = window.URL.createObjectURL(blob);
      anchor.click();
    }
  }

  exportparams(url: string, params: any): Observable<any> {
    return this.http.post(this.env.baseUrl + url, params, {
      observe: 'response',
      responseType: 'blob'
    });
  }


  deleteAllCookies() {
    var cookies = document.cookie.split(";");
    for (var i = 0; i < cookies.length; i++) {
      var cookie = cookies[i];
      var eqPos = cookie.indexOf("=");
      var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
      document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
    }
  }
}
