import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from'@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatRadioModule}  from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';

import { Medication } from '../models/medication';
import { User } from '../models/user';
import { MedicationDataService } from '../services/medication-data.service';
import { AuthenticationService } from '../services/authentication.service';
import { UserDataService } from '../services/user-data.service';

@Component({
  selector: 'app-quiz',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatIconModule,
    MatButtonModule, MatRadioModule, MatSelectModule,
    MatCardModule],
  templateUrl: './quiz.component.html',
  styleUrl: './quiz.component.css'
})
export class QuizComponent implements OnInit{
  user!: User;
  msg = '';

  quizMedications: Medication[] = [];

  quizQuestionData: {
      name: string,
      age: string,
      indication: string,
      mu: string
      formControl: number
      question: string,
      choices: string[],
      answer: string,
      userChoice: string
  }[] = []

  quizQuestionAnswers = new Map<number, string>;
  
  displayQuizResults: {
    userChoice: string,
    answer: any
  }[] = []
  

  public quizForm!: FormGroup;
  submitted = false;
  result = 0;

  i: number = 0;
  j: number = 0;

  public constructor(
    private authService: AuthenticationService,
    private medicationDataService: MedicationDataService,
    private userDataService: UserDataService,
    private router: Router,
    private formBuilder: FormBuilder,
  ){}

  ngOnInit(){
    this.user = this.authService.getCurrentUser();

    this.quizForm = this.formBuilder.group({
      0: ['', Validators.required],
      1: ['', Validators.required],
      2: ['', Validators.required],
      3: ['', Validators.required],
      4: ['', Validators.required],
      5: ['', Validators.required],
      6: ['', Validators.required],
      7: ['', Validators.required],
      8: ['', Validators.required],
      9: ['', Validators.required]
    })



    this.getQuizMeds();
  };

  public isLoggedIn(): boolean{
    return this.authService.isLoggedIn();
  }

  public getQuizMeds(){
    this.medicationDataService.getMedications()
      .subscribe({
        next: (value: Medication[]) => {
          this.msg = value.length + ' meds returned';

          if(value.length > 0){ 
            let i = 0;

            value.forEach( (med) => {
              // Push data returned from DB to an array 
              this.quizMedications.push(med);

              let indication_index = Math.floor(Math.random() * med.indications_dose.length);
              let indication = med.indications_dose.at(indication_index);

              let dose_index = Math.floor(Math.random() * med.indications_dose[indication_index].dose_and_route.length);
              let dose = indication!.dose_and_route.at(dose_index)

              this.quizQuestionAnswers.set(i, String(dose!.dose));

              if(i < 10){

                let tmp = Math.floor(Math.random() * 10) / 10;
                while(tmp == 0 || tmp.toString() == String(dose!.dose)){
                  tmp = Math.floor(Math.random() * 10) / 10;
                };

                this.quizQuestionData.push({
                  name: med.name,
                  age: med.age,
                  indication: indication!.indication,
                  mu: dose!.mu,
                  formControl: i,

                  choices: [
                    String(dose!.dose),
                    Math.floor(1 + Math.random() * 5).toString() + " - " +  (Math.floor(10 + Math.random() * 10).toString()),
                    Math.floor(10 + Math.random() * 10).toString() + " - " +  (Math.floor(20 + Math.random() * 20).toString()),
                    Math.floor(1 + Math.random() * 300).toString(),
                    tmp.toString()
                  ],
                  question: "What is the " + med.age + " dose of " + med.name + " for " + indication!.indication + " administered " + dose!.route + "?",
                  answer: String(dose!.dose),
                  userChoice: ''

                });
                i += 1;
              }
            });

            // randomize each answer option in the array of multiple choice options so the correct answers isn't the same choice option
            this.quizQuestionData.forEach( (array) => {
              for(let i = array.choices.length - 1; i > 0; i--){
                let j = Math.floor(Math.random() * (i + 1));
                [array.choices[i], array.choices[j]] = [array.choices[j], array.choices[i]]
              };
            });

          }else{
            this.msg = 'No medications found.';
          };
          console.log(this.msg);
        },
        error: function(error: any){
          console.log('Error: ' + error);
        },
      });
  
   };

   public quizSubmit(){
    this.submitted = true;

    for(let i = 0; i < 10; i++){
      if(this.quizForm.value[i] == this.quizQuestionAnswers.get(i)){
        this.result += 1
      }
      let data = this.quizQuestionData.at(i)
      data!.userChoice = this.quizForm.value[i]
    }

    document.getElementById('title_top')!.scrollIntoView();


    this.userDataService.addQuizResult(this.user, this.result)
    .subscribe({
      next: (value: any) => {
        this.authService.updateToken(this.user.email);
      },
      error: (error: any) => {
        console.log("error: ", error)
      }
    });
  }; 

  public closeQuizResults(){
    this.router.navigateByUrl('');
  };

  get values(){
    return this.quizForm.controls;
  };

  public showQuizMed(): any {
    return this.quizMedications[this.i];
  };

  public nextQuizMed(): void{    
    if(this.i < 9){
      this.i += 1;
    };
  };

  public previousQuizMed(): void{
    if(this.i > 0){
      this.i -= 1;
    };
  };

};
