import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Protocol } from '../models/protocol';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})

export class ProtocolDataService {
  constructor(private http: HttpClient) { }

  private apiBaseUrl = environment.apiUrl;

  getProtocols(): Observable<Protocol[]>{
    return this.http.get<Protocol[]>(`${this.apiBaseUrl}/protocols`);
  };

  getProtocolById(id: string): Observable<Protocol>{
    return this.http.get<Protocol>(`${this.apiBaseUrl}/protocols/${id}`);
  };

  addProtocol(formData: Protocol): Observable<Protocol>{
    return this.http.post<Protocol>(`${this.apiBaseUrl}/protocols`, formData, {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${localStorage.getItem('paraStudy-token')}`
      })
    });
  };

  updateProtocol(formData: Protocol): Observable<Protocol>{
    return this.http.put<Protocol>(`${this.apiBaseUrl}/protocols/${formData._id}`, formData, {
      headers: new HttpHeaders ({
        'Authorization': `Bearer ${localStorage.getItem('paraStudy-token')}`
      })
    });
  };

  deleteProtocol(id: string): Observable<any>{
    return this.http.post(`${this.apiBaseUrl}/protocols/${id}`, id, {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${localStorage.getItem('paraStudy-token')}`
      })
    });
  };

}; // end
