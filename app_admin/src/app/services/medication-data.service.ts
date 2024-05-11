import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Medication } from '../models/medication';
import { BROWSER_STORAGE } from '../storage';

@Injectable({
  providedIn: 'root'
})

export class MedicationDataService {

  constructor(private http: HttpClient,
    @Inject(BROWSER_STORAGE) private storage: Storage
  ) { }

  private apiBaseUrl = 'http://localhost:3000/api';


  getMedications(): Observable<Medication[]> {
    return this.http.get<Medication[]>(`${this.apiBaseUrl}/medications`);
  };

  getMedicationById(id: string): Observable<Medication>{
    return this.http.get<Medication>(`${this.apiBaseUrl}/medications/${id}`);
  };

  addMedication(formData: Medication): Observable<Medication>{
    return this.http.post<Medication>(`${this.apiBaseUrl}/medications`, formData, {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.storage.getItem('paraStudy-token')}`
      })
    });
  };

  updateMedication(formData: Medication): Observable<Medication>{
    return this.http.put<Medication>(`${this.apiBaseUrl}/medications/${formData._id}`, formData, {
      headers: new HttpHeaders ({
        'Authorization': `Bearer ${localStorage.getItem('paraStudy-token')}`
      })
    });
  };

  deleteMedication(id: string): Observable<any>{
    return this.http.post(`${this.apiBaseUrl}/medications/${id}`, id, {
      headers: new HttpHeaders ({
        'Authorization': `Bearer ${localStorage.getItem('paraStudy-token')}`
      })
    });
  };


};
