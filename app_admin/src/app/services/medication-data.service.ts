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

  deleteMedication(data: any): Observable<any>{
    return this.http.post(`${this.apiBaseUrl}/medications/${data.medication_id}`, data, {
      headers: new HttpHeaders ({
        'Authorization': `Bearer ${localStorage.getItem('paraStudy-token')}`
      })
    });
  };

  addMedicationIndication(form_data: any): Observable<any>{
    return this.http.put(`${this.apiBaseUrl}/medications/addIndication/${form_data.medication_id}`, form_data,{
      headers: new HttpHeaders({
        'Authorization': `Bearer ${localStorage.getItem('paraStudy-token')}`
      })
    });
  };

  updateMedicationIndication(form_data: any): Observable<any>{
    return this.http.put(`${this.apiBaseUrl}/medications/editIndication/${form_data.medication_id}`, form_data, {
      headers: new HttpHeaders ({
        'Authorization': `Bearer ${localStorage.getItem('paraStudy-token')}`
      })
    })
  }

  deleteMedicationIndication(data: any): Observable<any>{
    return this.http.put(`${this.apiBaseUrl}/medications/deleteIndication/${data.medication_id}`, data, {
      headers: new HttpHeaders ({
        'Authorization': `Bearer ${localStorage.getItem('paraStudy-token')}`
      })
    });
  };

  addMedicationDose(form_data: any): Observable<any>{
    return this.http.put(`${this.apiBaseUrl}/medications/addMedicationDose/${form_data.medication_id}`, form_data,{
      headers: new HttpHeaders({
        'Authorization': `Bearer ${localStorage.getItem('paraStudy-token')}`
      })
    });
  };

  updateMedicationDose(form_data: any): Observable<any>{
    return this.http.put(`${this.apiBaseUrl}/medications/updateMedicationDose/${form_data.medication_id}`, form_data, {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${localStorage.getItem('paraStudy-token')}`
      })
    });
  };

  deleteMedicationDose(data: any): Observable<any>{
    return this.http.put(`${this.apiBaseUrl}/medications/deleteMedicationDose/${data.medication_id}`, data, {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${localStorage.getItem('paraStudy-token')}`
      })
    });
  };

};
