import { Injectable, Inject } from '@angular/core';
import { lastValueFrom } from 'rxjs'
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';


import { User } from '../models/user';
import { AuthResponse } from '../models/auth-response';
import { BROWSER_STORAGE } from '../storage';



@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private apiBaseUrl = 'http://localhost:3000/api';

  constructor(
    @Inject(BROWSER_STORAGE) private storage: Storage,
    private http: HttpClient,
  ) { }


  public async authApiCall(urlPath: string, user: User): Promise<AuthResponse>{
    const url: string = `${this.apiBaseUrl}/${urlPath}`;
    return await lastValueFrom(this.http.post(url, user)) as AuthResponse;
  };

  public async getNewJwtToken(user_email: string, urlPath: string): Promise<AuthResponse>{
    const url = `${this.apiBaseUrl}/${urlPath}/${user_email}`
    return await lastValueFrom(this.http.get(url)) as AuthResponse
  }

  public async requestPasswordResetApiCall(urlPath: string, user: User): Promise<any>{
    const url: string = `${this.apiBaseUrl}/${urlPath}`;
    return await lastValueFrom(this.http.post(url, user));
  };

  public async passwordResetApiCall(urlPath: string, request: {}): Promise<any>{
    const url: string = `${this.apiBaseUrl}/${urlPath}`;
    return await lastValueFrom(this.http.post(url, request));
  };


  public login(user: User): Promise<any>{
    return this.authApiCall('login', user)
    .then( (authResp: AuthResponse) =>
    this.saveToken(authResp.token));
  };

  public logout(): void {
    localStorage.removeItem('paraStudy-token');
  };


  public register(user: User): Promise<any>{
    return this.authApiCall('register', user)
    .then( (authResp: AuthResponse)  => 
      this.saveToken(authResp.token));
  };

  public deleteUserAccount(user: User): Observable<any>{
    return this.http.post(`${this.apiBaseUrl}/deleteUserAccount`, {
      user: user
    })
  };

  public requestPasswordReset(user: User): Promise<any>{
    return this.requestPasswordResetApiCall('request-password-reset', user)
    .then( (resetData: string) => {
      console.log("request reset response data ", resetData)
      this.savePasswordResetData(resetData);
      console.log(this.getResetId())
      console.log(this.getResetToken())

    })
  };

  public savePasswordResetData(data: any): void {
    localStorage.setItem('req-password-user-id', data.userId)
    localStorage.setItem('req-password-reset-token', data.token)
  };

  public getResetId(): string{
    return String(localStorage.getItem('req-password-user-id'));
  };

  public getResetToken(): string{
    return String(localStorage.getItem('req-password-reset-token'));
  };

  public deleteResetData(): void{
    localStorage.removeItem('req-password-user-id');
    localStorage.removeItem('req-password-reset-token');
  };


  public passwordReset(request: {}): Promise<any>{
    return this.passwordResetApiCall('password-reset', request)
    .then( (response: any) => {
      this.deleteResetData();
      console.log("password reset call ", response);
    })
  };

  public saveToken(token: string): void{
    localStorage.setItem('paraStudy-token', token)
  };

  public async updateToken(user_email: string): Promise<any>{
    return await this.getNewJwtToken(user_email, 'user')
    .then( (authResp: AuthResponse) => {
      localStorage.removeItem('paraStudy-token');
      localStorage.setItem('paraStudy-token', authResp.token);
    })
    .catch(error => {
      console.log('Error: ', error)
    });
  }

  public getToken(): string{
    return String(localStorage.getItem('paraStudy-token'));
  };

  public isLoggedIn(): boolean{
    const token: string = this.getToken();

    if(token != 'null'){
      const payload = JSON.parse(atob(token.split('.')[1]));

      return payload.exp > (Date.now() / 1000)
    }else{
      return false;
    }
  };

  public getCurrentUser(){
    if(this.isLoggedIn()){
      const token: string = this.getToken();

      if(token != 'null'){
        const {email, name, role, study_deck, quiz_results} = JSON.parse(atob(token.split('.')[1]));
        //console.log(token, email, name);
        return {email, name, role, study_deck, quiz_results} as User;
      }
    }
    return {} as User;
  };


}; //end
