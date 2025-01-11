import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';

import { User } from '../models/user';
import { AuthenticationService } from './authentication.service'
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {

  constructor(
    private http: HttpClient,
    private authService: AuthenticationService
  ) { }

  private apiBaseUrl = environment.apiUrl;

  public addFlashcard(user: any, medicationId: string): Observable<any>{
    return this.http.post(`${this.apiBaseUrl}/addFlashcard`, {
      user: user,
      medId: medicationId
    });
  };

  public removeFlashcard(user: any, medicationId: string): Observable<any>{
    return this.http.post(`${this.apiBaseUrl}/removeFlashcard`, {
      user: user,
      medId: medicationId
    });
  };

  public deleteAllFlashcards(user: any): Observable<any>{
    return this.http.post(`${this.apiBaseUrl}/deleteAllFlashcards`, {
      user: user
    });
  };

  public addQuizResult(user: User, quizResult: any): Observable<any>{
  
    return this.http.post(`${this.apiBaseUrl}/addQuizResult`, {
      user: user,
      result: quizResult
    })
  }

  public deleteAllQuizResults(user: User): Observable<any>{
    return this.http.post(`${this.apiBaseUrl}/deleteAllQuizResults`, {
      user: user
    });
  };

}
