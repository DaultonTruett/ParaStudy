import { Injectable, Inject } from '@angular/core';
import { lastValueFrom } from 'rxjs'
import { HttpClient} from '@angular/common/http';


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


  public saveToken(token: string): void{
    localStorage.setItem('paraStudy-token', token)
  };


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
        const {email, name} = JSON.parse(atob(token.split('.')[1]));
        //console.log(token, email, name);
        return {email, name} as User;
      }
    }
    return {} as User;
  };


}; //end
