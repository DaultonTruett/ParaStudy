import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';

import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [CommonModule, FormsModule, MatButtonModule],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent implements OnInit{
  
  public formErrors: string = '';

  public user = {
    name: '',
    email: '',
    password: '',
    role: 'user',
    study_deck: [],
    quiz_results: [],
  };

  constructor(
    private router: Router,
    private authService: AuthenticationService
  ){}

  ngOnInit(){}

  public signUpSubmit(): void{

    if(!this.user.email || !this.user.password || !this.user.name){
      this.formErrors = "All fields required.";
    }else{
      this.authService.register(this.user)
      .then( () => this.router.navigateByUrl(''))
      .catch( (message) => this.formErrors = message);
    }
  }

  public clearForm(): void{
    (<HTMLFormElement>document.getElementById("signup_form")).reset();
  };

}
