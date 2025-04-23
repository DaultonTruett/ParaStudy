import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { RequestPasswordResetComponent } from './request-password-reset/request-password-reset.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ListMedicationsComponent } from './list-medications/list-medications.component';
import { AddMedicationComponent } from './add-medication/add-medication.component';
import { EditMedicationComponent } from './edit-medication/edit-medication.component';
import { DeleteMedicationComponent } from './delete-medication/delete-medication.component';
import { AddMedicationIndicationComponent } from './add-medication-indication/add-medication-indication.component';
import { EditMedicationIndicationComponent } from './edit-medication-indication/edit-medication-indication.component';
import { DeleteMedicationIndicationComponent } from './delete-medication-indication/delete-medication-indication.component';
import { AddMedicationDoseComponent } from './add-medication-dose/add-medication-dose.component';
import { EditMedicationDoseComponent } from './edit-medication-dose/edit-medication-dose.component';
import { DeleteMedicationDoseComponent } from './delete-medication-dose/delete-medication-dose.component';
import { StudydeckComponent } from './studydeck/studydeck.component'
import { QuizComponent } from './quiz/quiz.component';
import { UserAccountComponent } from './user-account/user-account.component';
import { DeleteUserAccountComponent } from './delete-user-account/delete-user-account.component';


export const routes: Routes = [
    {path: 'login', component: LoginComponent},
    {path: 'signup', component: SignUpComponent},
    {path: 'request-password-reset', component: RequestPasswordResetComponent},
    {path: 'reset-password', component: ResetPasswordComponent},
    {path: 'list-medications', component: ListMedicationsComponent},
    {path: 'add-medication', component: AddMedicationComponent},
    {path: 'edit-medication', component: EditMedicationComponent},
    {path: 'delete-medication', component: DeleteMedicationComponent},
    {path: 'add-medication-indication', component: AddMedicationIndicationComponent},
    {path: 'edit-medication-indication', component: EditMedicationIndicationComponent},
    {path: 'delete-medication-indication', component: DeleteMedicationIndicationComponent},
    {path: 'add-medication-dose', component: AddMedicationDoseComponent},
    {path: 'edit-medication-dose', component: EditMedicationDoseComponent},
    {path: 'delete-medication-dose', component: DeleteMedicationDoseComponent},
    {path: 'flashcards', component: StudydeckComponent},
    {path: 'quiz', component: QuizComponent},
    {path: 'my-account', component: UserAccountComponent},
    {path: 'delete-account', component: DeleteUserAccountComponent},
    {path: '', component: HomeComponent, pathMatch: 'full'}
];