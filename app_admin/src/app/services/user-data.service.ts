import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';

import { User } from '../models/user';
import { AuthenticationService } from './authentication.service'

@Injectable({
  providedIn: 'root'
})
export class UserDataService {

  constructor(
    private http: HttpClient,
    private authService: AuthenticationService
  ) { }

  private apiBaseUrl = 'http://localhost:3000/api';

  public addQuizResult(user: User, quizResult: any): Observable<any>{
  
    return this.http.post(`${this.apiBaseUrl}/addQuizResult`, {
      user: user,
      result: quizResult
    })
  }


}
