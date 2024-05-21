import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ListMedicationsComponent } from './list-medications/list-medications.component';
import { AddMedicationComponent } from './add-medication/add-medication.component';
import { EditMedicationComponent } from './edit-medication/edit-medication.component';
import { DeleteMedicationComponent } from './delete-medication/delete-medication.component';
import { ListProtocolsComponent } from './list-protocols/list-protocols.component';
import { AddProtocolComponent } from './add-protocol/add-protocol.component';
import { EditProtocolComponent } from './edit-protocol/edit-protocol.component';
import { DeleteProtocolComponent } from './delete-protocol/delete-protocol.component';


export const routes: Routes = [
    {path: 'login', component: LoginComponent},
    {path: 'list-medications', component: ListMedicationsComponent},
    {path: 'add-medication', component: AddMedicationComponent},
    {path: 'edit-medication', component: EditMedicationComponent},
    {path: 'delete-medication', component: DeleteMedicationComponent},
    {path: 'list-protocols', component: ListProtocolsComponent},
    {path: 'add-protocol', component: AddProtocolComponent},
    {path: 'edit-protocol', component: EditProtocolComponent},
    {path: 'delete-protocol', component: DeleteProtocolComponent},
    {path: '', component: HomeComponent, pathMatch: 'full'}
];
