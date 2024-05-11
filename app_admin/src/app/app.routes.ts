import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ListMedicationsComponent } from './list-medications/list-medications.component';
import { LoginComponent } from './login/login.component';
import { AddMedicationComponent } from './add-medication/add-medication.component';
import { EditMedicationComponent } from './edit-medication/edit-medication.component';
import { DeleteMedicationComponent } from './delete-medication/delete-medication.component';


export const routes: Routes = [
    {path: 'login', component: LoginComponent},
    {path: 'list-medications', component: ListMedicationsComponent},
    {path: 'add-medication', component: AddMedicationComponent},
    {path: 'edit-medication', component: EditMedicationComponent},
    {path: 'delete-medication', component: DeleteMedicationComponent},
    {path: '', component: HomeComponent, pathMatch: 'full'}
];
