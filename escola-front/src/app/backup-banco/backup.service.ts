import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BackUpStartService {
  private readonly baseUrl = 'http://localhost:8080/api/backup';

  constructor(private http: HttpClient) { }

  triggerBackup(): Observable<string> {
   
    return this.http.post(
      `${this.baseUrl}/start`,
      {},
      { 
        responseType: 'text',
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      }
    );
  }
}