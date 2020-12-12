import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CheckinComponent} from '../checkin.component';
import {NotFoundComponent} from '../../not-found/not-found.component';



const checkinRoutes: Routes = [
  { path: '', component: CheckinComponent },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forChild(checkinRoutes)],
  exports: [RouterModule]
})
export class CheckinRoutingModule { }
