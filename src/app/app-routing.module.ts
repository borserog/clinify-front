import { AuthGuard } from './core/auth/auth-guard.guard';
import { UsersComponent } from './modules/main/users/users.component';
import { NewUserComponent } from './modules/login/new-user/new-user.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from 'src/app/modules/login/login.component';
import { MainComponent } from 'src/app/modules/main/main.component';
import { NotFoundComponent } from 'src/app/modules/not-found/not-found.component';
import { PatientsComponent } from './modules/main/patients/patients.component';
import { ExamsComponent } from './modules/main/exams/exams.component';
import {NewPatientComponent} from './modules/main/patients/new-patient/new-patient.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  {
    path: 'checkin',
    loadChildren: () => import('../app/modules/checkin/checkin.module').then(m => m.CheckinModule)
  },
  { path: 'login', component: LoginComponent },
  { path: 'new-user', component: NewUserComponent},
  {
    path: 'main',
    component: MainComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'users', component: UsersComponent },
      { path: 'patients', component: PatientsComponent,
        children: [
          {path: 'new-patient', component: NewPatientComponent}
        ]},
      { path: 'exams', component: ExamsComponent }
    ]
   },
   {path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
